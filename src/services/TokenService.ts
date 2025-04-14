import { injectable, inject } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { ERROR_CODES } from '../constants/errorMessages';
import { HttpStatusCode } from '../constants/httpCodes';
import { PrismaClient } from '@prisma/client';

@injectable()
export class TokenService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient
  ) {}

  private readonly JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
  private readonly ACCESS_TOKEN_EXPIRY = '15m';
  private readonly REFRESH_TOKEN_EXPIRY = '7d';
  private readonly PASSWORD_RESET_TOKEN_EXPIRY = '1h';

  generateAccessToken(userId: string): string {
    try {
      return jwt.sign({ userId }, this.JWT_SECRET, {
        expiresIn: this.ACCESS_TOKEN_EXPIRY
      });
    } catch (error) {
      throw new AppError(ERROR_CODES.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async generateRefreshToken(userId: string): Promise<string> {
    try {
      const token = jwt.sign({ userId }, this.JWT_SECRET, {
        expiresIn: this.REFRESH_TOKEN_EXPIRY
      });

      await this.prisma.refreshToken.create({
        data: {
          token,
          userId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
      });

      return token;
    } catch (error) {
      throw new AppError(ERROR_CODES.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async generatePasswordResetToken(userId: string): Promise<string> {
    try {
      const token = jwt.sign({ userId }, this.JWT_SECRET, {
        expiresIn: this.PASSWORD_RESET_TOKEN_EXPIRY
      });

      await this.prisma.passwordResetToken.create({
        data: {
          token,
          userId,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
          used: false
        }
      });

      return token;
    } catch (error) {
      throw new AppError(ERROR_CODES.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyAccessToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: string };
      return decoded.userId;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError(ERROR_CODES.TOKEN_EXPIRED, HttpStatusCode.UNAUTHORIZED);
      }
      throw new AppError(ERROR_CODES.TOKEN_INVALID, HttpStatusCode.UNAUTHORIZED);
    }
  }

  async verifyRefreshToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: string };
      
      const storedToken = await this.prisma.refreshToken.findFirst({
        where: { 
          token,
          revoked: false,
          expiresAt: { gt: new Date() }
        }
      });

      if (!storedToken) {
        throw new AppError(ERROR_CODES.TOKEN_INVALID, HttpStatusCode.UNAUTHORIZED);
      }

      return decoded.userId;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError(ERROR_CODES.TOKEN_EXPIRED, HttpStatusCode.UNAUTHORIZED);
      }
      if (error instanceof AppError) throw error;
      throw new AppError(ERROR_CODES.TOKEN_INVALID, HttpStatusCode.UNAUTHORIZED);
    }
  }

  async verifyPasswordResetToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: string };
      
      const resetToken = await this.prisma.passwordResetToken.findFirst({
        where: { 
          token,
          used: false,
          expiresAt: { gt: new Date() }
        }
      });

      if (!resetToken) {
        throw new AppError(ERROR_CODES.TOKEN_INVALID, HttpStatusCode.BAD_REQUEST);
      }

      return decoded.userId;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError(ERROR_CODES.TOKEN_EXPIRED, HttpStatusCode.BAD_REQUEST);
      }
      if (error instanceof AppError) throw error;
      throw new AppError(ERROR_CODES.TOKEN_INVALID, HttpStatusCode.BAD_REQUEST);
    }
  }

  async revokeRefreshToken(token: string): Promise<void> {
    try {
      await this.prisma.refreshToken.update({
        where: { token },
        data: { revoked: true }
      });
    } catch (error) {
      throw new AppError(ERROR_CODES.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async revokePasswordResetToken(token: string): Promise<void> {
    try {
      await this.prisma.passwordResetToken.update({
        where: { token },
        data: { used: true }
      });
    } catch (error) {
      throw new AppError(ERROR_CODES.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    const userId = await this.verifyRefreshToken(refreshToken);
    const newAccessToken = this.generateAccessToken(userId);
    return { accessToken: newAccessToken };
  }
} 