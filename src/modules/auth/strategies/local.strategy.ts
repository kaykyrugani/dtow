import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { MetricsService } from '../../../modules/metrics/metrics.service';
import { LoggerService } from '../../../logging/logger.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly metricsService: MetricsService,
    private readonly logger: LoggerService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(email, password);
      
      if (!user) {
        this.metricsService.recordMetric('auth_login_attempts', 1, { status: 'failure' });
        throw new UnauthorizedException();
      }

      this.metricsService.recordMetric('auth_login_attempts', 1, { status: 'success' });
      return user;
    } catch (error) {
      this.metricsService.recordMetric('auth_login_attempts', 1, { status: 'error' });
      this.logger.error('Erro na autenticação local', { error: error.message });
      throw error;
    }
  }
} 