import { injectable, inject } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpCodes';
import { ERROR_MESSAGES } from '../constants/errorMessages';

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
} 