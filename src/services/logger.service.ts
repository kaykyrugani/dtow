import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger;

  constructor(private configService: ConfigService) {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';

    // Configuração base para todos os transportes
    const baseFormat = format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    );

    // Configuração para console (com cores em desenvolvimento)
    const consoleFormat = isProduction
      ? baseFormat
      : format.combine(
          format.colorize({ all: true }),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
          format.printf(
            info =>
              `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`,
          ),
        );

    // Configuração para arquivos
    const fileFormat = baseFormat;

    // Transportes
    const transportList = [
      // Console sempre presente
      new transports.Console({
        format: consoleFormat,
        level: isProduction ? 'info' : 'debug',
        stderrLevels: ['error', 'warn'],
      }),
    ];

    // Em produção, adiciona transportes para arquivo com rotação
    if (isProduction) {
      // Arquivo de erro com rotação
      transportList.push(
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          format: fileFormat,
          maxSize: '10m',
          maxFiles: '14d',
          zippedArchive: true,
        }),
      );

      // Arquivo combinado com rotação
      transportList.push(
        new DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          format: fileFormat,
          maxSize: '10m',
          maxFiles: '14d',
          zippedArchive: true,
        }),
      );
    }

    // Cria o logger
    this.logger = createLogger({
      level: this.configService.get('LOG_LEVEL', isProduction ? 'info' : 'debug'),
      format: baseFormat,
      transports: transportList,
      exitOnError: false,
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
