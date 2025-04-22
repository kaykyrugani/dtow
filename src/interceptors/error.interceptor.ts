import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError, ErrorResponse } from '../errors/AppError';
import { LoggingService } from '../services/LoggingService';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = LoggingService.getInstance();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = request.headers['x-request-id'] || 'N/A';

    return next.handle().pipe(
      catchError(error => {
        let errorResponse: ErrorResponse;

        if (error instanceof AppError) {
          error.requestId = requestId;
          errorResponse = error.toResponse();
        } else if (error instanceof HttpException) {
          errorResponse = {
            requestId,
            timestamp: new Date().toISOString(),
            erros: [
              {
                campo: 'unknown',
                codigo: `ERR_HTTP_${error.getStatus()}`,
                mensagem: error.message,
              },
            ],
          };
        } else {
          errorResponse = {
            requestId,
            timestamp: new Date().toISOString(),
            erros: [
              {
                campo: 'unknown',
                codigo: 'ERR_INTERNAL',
                mensagem: 'Erro interno do servidor',
              },
            ],
          };

          this.logger.error('Erro não tratado', {
            error: error.message,
            stack: error.stack,
            requestId,
          });
        }

        this.logger.warn('Erro na requisição', {
          path: request.path,
          method: request.method,
          errorResponse,
          requestId,
        });

        return throwError(
          () =>
            new HttpException(errorResponse, error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR),
        );
      }),
    );
  }
}
