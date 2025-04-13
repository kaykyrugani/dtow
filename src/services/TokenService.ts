import { injectable, inject } from 'tsyringe';
import jwt, { sign, verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpCodes';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { prisma } from '../database';

@injectable()
export class TokenService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient
  ) {}

  generateAccessToken(userId: number): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '15m' }
    );
  }

  async generateRefreshToken(userId: number): Promise<string> {
    const token = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
      { expiresIn: '7d' }
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt
      }
    });

    return token;
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const tokenData = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { usuario: true }
      });

      if (!tokenData || tokenData.expiresAt < new Date()) {
        throw new AppError('TOKEN_EXPIRED', HttpStatusCode.UNAUTHORIZED);
      }

      // Gerar novo access token
      const accessToken = this.generateAccessToken(tokenData.userId);

      // Gerar novo refresh token
      await this.prisma.refreshToken.delete({
        where: { id: tokenData.id }
      });

      const newRefreshToken = await this.generateRefreshToken(tokenData.userId);

      return {
        accessToken,
        refreshToken: newRefreshToken
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('INTERNAL_ERROR', HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: { token }
    });
  }

  async revokeAllUserTokens(userId: number): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { userId }
    });
  }

  public async generatePasswordResetToken(userId: number): Promise<string> {
    const token = sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
    await this.prisma.passwordResetToken.create({
      data: {
        token,
        userId,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
      }
    });

    return token;
  }

  public async verifyPasswordResetToken(token: string): Promise<number> {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as { userId: number };
      
      const resetToken = await this.prisma.passwordResetToken.findFirst({
        where: {
          token,
          userId: decoded.userId,
          used: false,
          expiresAt: {
            gt: new Date()
          }
        }
      });

      if (!resetToken) {
        throw new AppError('Token inválido ou expirado', 401);
      }

      return decoded.userId;
    } catch (error) {
      throw new AppError('Token inválido ou expirado', 401);
    }
  }

  public async revokePasswordResetToken(token: string): Promise<void> {
    await this.prisma.passwordResetToken.update({
      where: { token },
      data: { used: true }
    });
  }
} 