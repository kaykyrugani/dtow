import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../../modules/redis/redis.service';
import { MetricsService } from '../../../modules/metrics/metrics.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly metricsService: MetricsService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // TODO: Implementar validação real com banco de dados
    const user = { id: 1, email: 'test@example.com', password: 'password' };

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    // Registrar métricas de login
    this.metricsService.recordMetric('auth_login_success', 1);

    // Armazenar token no Redis com TTL
    const tokenId = uuidv4();
    await this.redisService.set(
      `auth:token:${tokenId}`,
      token,
      this.configService.get<number>('JWT_EXPIRATION_SECONDS', 3600),
    );

    return {
      access_token: token,
      token_id: tokenId,
    };
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const payload = this.jwtService.verify(token);
      const tokenExists = await this.redisService.get(`auth:token:${payload.token_id}`);

      if (!tokenExists) {
        this.metricsService.recordMetric('auth_token_invalid', 1);
        return false;
      }

      return true;
    } catch (error) {
      this.metricsService.recordMetric('auth_token_validation_error', 1);
      return false;
    }
  }

  async logout(tokenId: string): Promise<void> {
    await this.redisService.del(`auth:token:${tokenId}`);
    this.metricsService.recordMetric('auth_logout_success', 1);
  }
}
