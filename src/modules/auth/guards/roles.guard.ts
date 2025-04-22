import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { MetricsService } from '../../../services/metrics.service';
import { LoggerService } from '../../../services/logger.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private logger: LoggerService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      MetricsService.incrementAuthFailure();
      this.logger.error('Usuário não encontrado na requisição');
      return false;
    }

    const hasRole = requiredRoles.some(role => user.role === role);

    if (!hasRole) {
      MetricsService.incrementAuthFailure();
      this.logger.error('Usuário sem permissão', {
        userId: user.id,
        requiredRole: requiredRoles,
        userRole: user.role,
      });
      return false;
    }

    MetricsService.incrementAuthSuccess();
    return true;
  }
}
