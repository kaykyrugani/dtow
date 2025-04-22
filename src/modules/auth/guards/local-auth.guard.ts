import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { MetricsService } from '../../../modules/metrics/metrics.service';
import { LoggerService } from '../../../logging/logger.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(
    private reflector: Reflector,
    private readonly metricsService: MetricsService,
    private readonly logger: LoggerService,
  ) {
    super();
  }

  canActivate(context: any) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.metricsService.recordMetric('auth_login_attempts', 1, { status: 'failure' });
      this.logger.error('Erro na autenticação local', { error: err?.message || info?.message });
      throw err || new Error('Credenciais inválidas');
    }

    this.metricsService.recordMetric('auth_login_attempts', 1, { status: 'success' });
    return user;
  }
} 