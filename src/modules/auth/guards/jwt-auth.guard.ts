import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { MetricsService } from '../../../modules/metrics/metrics.service';
import { LoggerService } from '../../../logging/logger.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly metricsService: MetricsService,
    private readonly logger: LoggerService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
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
      this.metricsService.recordMetric('auth_token_validations', 1, { status: 'failure' });
      this.logger.error('Erro na validação do token JWT', { error: err?.message || info?.message });
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    this.metricsService.recordMetric('auth_token_validations', 1, { status: 'success' });
    return user;
  }
}
