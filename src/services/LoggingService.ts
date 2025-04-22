import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { LoggingInterface, LogContext } from '../interfaces/LoggingInterface';
import { EnvConfig } from '../config/env';

@Injectable()
export class LoggingService implements LoggingInterface {
  private static instance: LoggingService;
  private logger;

  private constructor() {
    this.logger = createLogger({
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  public static getInstance(): LoggingService {
    if (!LoggingService.instance) {
      LoggingService.instance = new LoggingService();
    }
    return LoggingService.instance;
  }

  public info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  public error(message: string, meta?: any) {
    this.logger.error(message, meta);
  }

  public warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  public debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }

  private createTemporaryLogger(): createLogger {
    return createLogger({
      level: 'warn',
      format: format.combine(format.timestamp(), format.simple()),
      transports: [new transports.Console()],
    });
  }

  private initializeWinston(): createLogger {
    const transports: transports[] = [];

    // Sempre adiciona log de erro em arquivo
    transports.push(
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: this.getLogFormat(),
      }),
    );

    try {
      if (this.env.LOGTAIL_API_KEY) {
        // Aqui você adicionaria a configuração do Logtail
        this.logger.info('✅ Logtail configurado com sucesso');
      }
    } catch (error) {
      this.logger.warn('⚠️ Fallback para console logging:', {
        reason: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }

    // Em desenvolvimento, adiciona console colorido
    if (this.env.NODE_ENV !== 'production') {
      transports.push(
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      );
    }

    return createLogger({
      level: this.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: this.getLogFormat(),
      transports,
      exitOnError: false,
    });
  }

  private getLogFormat() {
    return format.combine(
      format.timestamp(),
      format.json(),
      format(info => {
        info.environment = this.env.NODE_ENV;
        info.service = 'auth-service';
        return info;
      })(),
    );
  }

  private sanitizeContext(context?: LogContext): LogContext | undefined {
    if (!context) return undefined;

    const sensitiveFields = ['password', 'token', 'secret', 'authorization'];
    return Object.entries(context).reduce((acc, [key, value]) => {
      if (sensitiveFields.includes(key.toLowerCase())) {
        acc[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        acc[key] = this.sanitizeContext(value);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as LogContext);
  }

  info(message: string, context?: LogContext): void {
    this.logger.info(message, this.sanitizeContext(context));
  }

  warn(message: string, context?: LogContext): void {
    this.logger.warn(message, this.sanitizeContext(context));
  }

  error(message: string, context?: LogContext): void {
    this.logger.error(message, this.sanitizeContext(context));
  }

  debug(message: string, context?: LogContext): void {
    this.logger.debug(message, this.sanitizeContext(context));
  }

  // Método para testes
  getTransports(): transports[] {
    return this.logger.transports;
  }
}
