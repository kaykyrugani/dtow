import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MetricsService } from '../../../modules/metrics/metrics.service';
import { LoggerService } from '../../../logging/logger.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    private metricsService: MetricsService,
    private logger: LoggerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.metricsService.recordMetric('auth_role_validation', 1, { status: 'failure' });
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      request.user = payload;

      const hasRole = requiredRoles.some(role => payload.role === role);

      if (!hasRole) {
        this.metricsService.recordMetric('auth_role_validation', 1, { status: 'failure' });
        throw new UnauthorizedException('Permissão insuficiente');
      }

      this.metricsService.recordMetric('auth_role_validation', 1, { status: 'success' });
      return true;
    } catch (error) {
      this.metricsService.recordMetric('auth_role_validation', 1, { status: 'error' });
      this.logger.error('Erro na validação de roles', { error: error.message });
      throw new UnauthorizedException('Token inválido');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
