import { Request, Response } from 'express';
import { TwoFactorService } from '../services/twoFactor.service';
import { AppError } from '../utils/AppError';
import { z } from 'zod';

const enable2FASchema = z.object({
  token: z.string().length(6)
});

const disable2FASchema = z.object({
  token: z.string().length(6)
});

const verifyBackupCodeSchema = z.object({
  code: z.string().min(10).max(10)
});

export class TwoFactorController {
  static async setup2FA(req: Request, res: Response) {
    try {
      const secret = await TwoFactorService.generateSecret(req.user.id);
      const qrCode = await TwoFactorService.generateQRCode(secret, req.user.email);
      const backupCodes = await TwoFactorService.generateBackupCodes(req.user.id);

      return res.json({
        secret,
        qrCode,
        backupCodes
      });
    } catch (error) {
      throw new AppError('Erro ao configurar 2FA', 500);
    }
  }

  static async enable2FA(req: Request, res: Response) {
    try {
      const { token } = enable2FASchema.parse(req.body);
      await TwoFactorService.enable2FA(req.user.id, token);

      return res.json({ message: '2FA ativado com sucesso' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError('Token inválido', 400);
      }
      throw error;
    }
  }

  static async disable2FA(req: Request, res: Response) {
    try {
      const { token } = disable2FASchema.parse(req.body);
      await TwoFactorService.disable2FA(req.user.id, token);

      return res.json({ message: '2FA desativado com sucesso' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError('Token inválido', 400);
      }
      throw error;
    }
  }

  static async verifyBackupCode(req: Request, res: Response) {
    try {
      const { code } = verifyBackupCodeSchema.parse(req.body);
      await TwoFactorService.verifyBackupCode(req.user.id, code);

      return res.json({ message: 'Código de backup válido' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError('Código de backup inválido', 400);
      }
      throw error;
    }
  }

  static async get2FAStatus(req: Request, res: Response) {
    try {
      const user = await prisma.usuario.findUnique({
        where: { id: req.user.id },
        select: {
          twoFactorEnabled: true,
          twoFactorBackupCodes: true
        }
      });

      return res.json({
        enabled: user?.twoFactorEnabled || false,
        backupCodesRemaining: user?.twoFactorBackupCodes?.length || 0
      });
    } catch (error) {
      throw new AppError('Erro ao obter status do 2FA', 500);
    }
  }
} 