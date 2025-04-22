import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRoutes } from './modules/admin/routes/auth.routes';
import { AppError } from './errors/AppError';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './services/logger.service';
import { ConfigService } from '@nestjs/config';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Error handling
app.use(
  (err: Error, request: express.Request, response: express.Response, _: express.NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    const logger = new LoggerService();
    logger.error('Erro interno do servidor', err.stack, 'ErrorHandler');

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(LoggerService);

  const PORT = configService.get<number>('PORT', 3000);

  try {
    await app.listen(PORT);
    logger.log(`🚀 Server running on port ${PORT}`, 'Bootstrap');
  } catch (err) {
    logger.error('Failed to start server', err.stack, 'Bootstrap');
    process.exit(1);
  }
}

bootstrap();
