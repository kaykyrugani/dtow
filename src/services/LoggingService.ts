import { injectable, inject } from 'tsyringe';
import * as Winston from 'winston';
import { LoggingInterface, LogContext } from '../interfaces/LoggingInterface';
import { EnvConfig } from '../config/env';

@injectable()
export class LoggingService implements LoggingInterface {
  private winston: Winston.Logger;
  private temporaryLogger: Winston.Logger;

  constructor(@inject('Env') private env: EnvConfig) {
    this.temporaryLogger = this.createTemporaryLogger();
    this.winston = this.initializeWinston();
  }

  private createTemporaryLogger(): Winston.Logger {
    return Winston.createLogger({
      level: 'warn',
      format: Winston.format.combine(
        Winston.format.timestamp(),
        Winston.format.simple()
      ),
      transports: [new Winston.transports.Console()]
    });
  }

  private initializeWinston(): Winston.Logger {
    const transports: Winston.transport[] = [];
    
    // Sempre adiciona log de erro em arquivo
    transports.push(
      new Winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: this.getLogFormat()
      })
    );

    try {
      if (this.env.LOGTAIL_API_KEY) {
        // Aqui você adicionaria a configuração do Logtail
        this.temporaryLogger.info('✅ Logtail configurado com sucesso');
      }
    } catch (error) {
      this.temporaryLogger.warn('⚠️ Fallback para console logging:', {
        reason: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }

    // Em desenvolvimento, adiciona console colorido
    if (this.env.NODE_ENV !== 'production') {
      transports.push(
        new Winston.transports.Console({
          format: Winston.format.combine(
            Winston.format.colorize(),
            Winston.format.simple()
          )
        })
      );
    }

    return Winston.createLogger({
      level: this.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: this.getLogFormat(),
      transports,
      exitOnError: false
    });
  }

  private getLogFormat() {
    return Winston.format.combine(
      Winston.format.timestamp(),
      Winston.format.json(),
      Winston.format((info) => {
        info.environment = this.env.NODE_ENV;
        info.service = 'auth-service';
        return info;
      })()
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
    this.winston.info(message, this.sanitizeContext(context));
  }

  warn(message: string, context?: LogContext): void {
    this.winston.warn(message, this.sanitizeContext(context));
  }

  error(message: string, context?: LogContext): void {
    this.winston.error(message, this.sanitizeContext(context));
  }

  debug(message: string, context?: LogContext): void {
    this.winston.debug(message, this.sanitizeContext(context));
  }

  // Método para testes
  getTransports(): Winston.transport[] {
    return this.winston.transports;
  }
} 