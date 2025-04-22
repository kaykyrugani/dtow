import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger.service';
import { MetricsService } from './metrics.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
  ) {}

  async generateToken(userId: string, role: string): Promise<string> {
    try {
      const payload = { userId, role };
      const token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '1h'),
      });

      MetricsService.incrementAuthSuccess();
      return token;
    } catch (error) {
      MetricsService.incrementAuthFailure();
      this.logger.error('Erro ao gerar token', { error: error.message, userId });
      throw error;
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      MetricsService.incrementAuthSuccess();
      return payload;
    } catch (error) {
      MetricsService.incrementAuthFailure();
      this.logger.error('Erro ao validar token', { error: error.message });
      throw error;
    }
  }

  async refreshToken(token: string): Promise<string> {
    try {
      const payload = await this.validateToken(token);
      return this.generateToken(payload.userId, payload.role);
    } catch (error) {
      this.logger.error('Erro ao atualizar token', { error: error.message });
      throw error;
    }
  }
}
