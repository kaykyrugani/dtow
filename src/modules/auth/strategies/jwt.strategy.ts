import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../../modules/redis/redis.service';
import { MetricsService } from '../../../modules/metrics/metrics.service';
import { LoggerService } from '../../../logging/logger.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly metricsService: MetricsService,
    private readonly logger: LoggerService,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      // Verificar se o token está na lista negra
      const isBlacklisted = await this.redisService.get(`blacklist:${payload.jti}`);
      if (isBlacklisted) {
        this.metricsService.recordMetric('auth_token_blacklisted', 1);
        throw new UnauthorizedException('Token inválido');
      }

      // Registrar métrica de validação bem-sucedida
      this.metricsService.recordMetric('auth_token_validations', 1, { status: 'success' });

      return {
        userId: payload.sub,
        email: payload.email,
        role: payload.role,
      };
    } catch (error) {
      this.metricsService.recordMetric('auth_token_validations', 1, { status: 'error' });
      this.logger.error('Erro na validação do token JWT', { error: error.message });
      throw new UnauthorizedException('Token inválido');
    }
  }
} 