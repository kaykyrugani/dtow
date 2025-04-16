import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

export class TwoFactorService {
  static async generateSecret(userId: string) {
    const secret = authenticator.generateSecret();
    
    await prisma.usuario.update({
      where: { id: userId },
      data: {
        twoFactorSecret: secret,
        twoFactorEnabled: false
      }
    });

    return secret;
  }

  static async generateQRCode(secret: string, email: string) {
    const otpauth = authenticator.keyuri(email, 'OnlyWave25', secret);
    return QRCode.toDataURL(otpauth);
  }

  static async verifyToken(secret: string, token: string) {
    return authenticator.verify({ token, secret });
  }

  static async enable2FA(userId: string, token: string) {
    const user = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { twoFactorSecret: true }
    });

    if (!user?.twoFactorSecret) {
      throw new AppError('2FA não configurado. Gere um novo secret primeiro.', 400);
    }

    const isValid = await this.verifyToken(user.twoFactorSecret, token);

    if (!isValid) {
      throw new AppError('Token inválido', 400);
    }

    await prisma.usuario.update({
      where: { id: userId },
      data: { twoFactorEnabled: true }
    });

    return true;
  }

  static async disable2FA(userId: string, token: string) {
    const user = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { twoFactorSecret: true, twoFactorEnabled: true }
    });

    if (!user?.twoFactorEnabled) {
      throw new AppError('2FA não está ativado', 400);
    }

    const isValid = await this.verifyToken(user.twoFactorSecret!, token);

    if (!isValid) {
      throw new AppError('Token inválido', 400);
    }

    await prisma.usuario.update({
      where: { id: userId },
      data: { 
        twoFactorEnabled: false,
        twoFactorSecret: null
      }
    });

    return true;
  }

  static async generateBackupCodes(userId: string) {
    const backupCodes = Array.from({ length: 8 }, () => 
      authenticator.generateSecret(10)
    );

    await prisma.usuario.update({
      where: { id: userId },
      data: { 
        twoFactorBackupCodes: backupCodes
      }
    });

    return backupCodes;
  }

  static async verifyBackupCode(userId: string, code: string) {
    const user = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { twoFactorBackupCodes: true }
    });

    if (!user?.twoFactorBackupCodes?.includes(code)) {
      throw new AppError('Código de backup inválido', 400);
    }

    // Remove o código usado
    await prisma.usuario.update({
      where: { id: userId },
      data: {
        twoFactorBackupCodes: {
          set: user.twoFactorBackupCodes.filter(c => c !== code)
        }
      }
    });

    return true;
  }
} 