import { prisma } from '../../../config/database';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { authenticator } from 'otplib';
import { AppError } from '../../../errors/AppError';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export class AuthService {
  async login({ email, password }: LoginCredentials): Promise<LoginResponse> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1d' },
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async generate2FASecret(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(user.email, 'OnlyWave', secret);

    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret },
    });

    return {
      secret,
      qrCode: otpauth,
    };
  }

  async verify2FA(userId: string, token: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.twoFactorSecret) {
      throw new AppError('Invalid 2FA configuration', 400);
    }

    const isValid = authenticator.verify({
      token,
      secret: user.twoFactorSecret,
    });

    if (!isValid) {
      throw new AppError('Invalid 2FA token', 401);
    }

    return true;
  }
}
