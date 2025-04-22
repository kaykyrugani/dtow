import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { MetricsService } from './services/metrics.service';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logging/logger.service';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import compression from 'compression';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initSentry } from './config/sentry.config';

// Extendendo a interface Request para incluir requestId
declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig(process.env.NODE_ENV || 'development')),
  });

  const configService = app.get(ConfigService);

  if (configService.get('sentry.enabled')) {
    initSentry();
    logger.log('Sentry initialized');
  }

  // Configuração de segurança
  app.use(helmet());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.use(compression());

  // Configuração de validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle(configService.get('swagger.title'))
    .setDescription(configService.get('swagger.description'))
    .setVersion(configService.get('swagger.version'))
    .addTag(configService.get('swagger.tag'))
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get('swagger.path'), app, document);

  // Middleware de métricas
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      MetricsService.observeHttpDuration({
        method: req.method,
        path: req.route?.path || req.path,
        status: res.statusCode,
        duration,
      });
    });
    next();
  });

  // Middleware de requestId
  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = (req.headers['x-request-id'] as string) || crypto.randomUUID();
    req.requestId = requestId;
    res.setHeader('X-Request-ID', requestId);
    next();
  });

  // Middleware de logging
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.log(`${req.method} ${req.url}`);
    next();
  });

  // Middleware de tratamento de erros
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err.stack);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: err.message,
    });
  });

  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(
    `Swagger documentation is available at: http://localhost:${port}/${configService.get('swagger.path')}`,
  );
}

bootstrap();
