import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../modules/redis/redis.service';
import { MetricsService } from '../../modules/metrics/metrics.service';
import { LoggerService } from '../../logging/logger.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly metricsService: MetricsService,
    private readonly logger: LoggerService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const storedToken = await this.redisService.get(`refresh:${payload.sub}`);
      
      if (!storedToken || storedToken !== refreshToken) {
        throw new UnauthorizedException('Refresh token inválido');
      }

      const newAccessToken = await this.generateAccessToken({
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
        jti: uuidv4(),
      });

      this.metricsService.recordMetric('auth_token_refreshed', 1);
      return { accessToken: newAccessToken };
    } catch (error) {
      this.metricsService.recordMetric('auth_token_refresh_error', 1);
      this.logger.error('Erro ao refresh token', { error: error.message });
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async logout(userId: string, tokenId: string) {
    try {
      // Adicionar token à lista negra
      await this.redisService.set(
        `blacklist:${tokenId}`,
        '1',
        'EX',
        this.configService.get('JWT_EXPIRES_IN', '1h'),
      );

      // Remover refresh token
      await this.redisService.del(`refresh:${userId}`);

      this.metricsService.recordMetric('auth_logout_success', 1);
      return { message: 'Logout realizado com sucesso' };
    } catch (error) {
      this.metricsService.recordMetric('auth_logout_error', 1);
      this.logger.error('Erro no logout', { error: error.message });
      throw error;
    }
  }

  private async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '1h'),
    });
  }

  private async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
    });
  }
}
