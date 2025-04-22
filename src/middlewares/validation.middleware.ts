import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ZodSchema } from 'zod';
import { LoggingService } from '../services/LoggingService';

@Injectable()
export class ValidationMiddleware implements CanActivate {
  private readonly logger = LoggingService.getInstance();

  constructor(private readonly schema: ZodSchema) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    try {
      const validatedData = this.schema.parse(request.body);
      request.body = validatedData;
      return true;
    } catch (error) {
      if (error.name === 'ZodError') {
        const errors = error.errors.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        this.logger.warn('Erro de validação', {
          path: request.path,
          method: request.method,
          errors,
        });

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Erro de Validação',
            details: errors,
            timestamp: new Date().toISOString(),
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      this.logger.error('Erro inesperado durante validação', {
        path: request.path,
        method: request.method,
        error: error.message,
      });

      throw error;
    }
  }
}
