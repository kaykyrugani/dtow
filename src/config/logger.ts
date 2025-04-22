import winston from 'winston';
import { config } from './env';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'gray',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.printf(
    info =>
      `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`,
  ),
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: consoleFormat,
    level: config.NODE_ENV === 'production' ? 'info' : 'debug',
    stderrLevels: ['error', 'warn'],
  }),
];

// Adiciona transporte para arquivo em produção
if (config.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      stderrLevels: ['error'],
    } as winston.transports.FileTransportOptions),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    } as winston.transports.FileTransportOptions),
  );
}

export const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info',
  levels,
  format,
  transports,
  exitOnError: false,
});

// Adiciona handlers para erros não tratados
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
});

// Exporta uma função helper para logging estruturado
export const log = {
  error: (message: string, meta?: Record<string, unknown>) => {
    logger.error(message, { ...meta, timestamp: new Date().toISOString() });
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    logger.warn(message, { ...meta, timestamp: new Date().toISOString() });
  },
  info: (message: string, meta?: Record<string, unknown>) => {
    logger.info(message, { ...meta, timestamp: new Date().toISOString() });
  },
  http: (message: string, meta?: Record<string, unknown>) => {
    logger.http(message, { ...meta, timestamp: new Date().toISOString() });
  },
  debug: (message: string, meta?: Record<string, unknown>) => {
    logger.debug(message, { ...meta, timestamp: new Date().toISOString() });
  },
};
