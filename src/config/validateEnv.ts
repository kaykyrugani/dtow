import { z } from 'zod';
import { logger } from './logger';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1d'),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  RATE_LIMIT_WINDOW: z.string().transform(Number).default('15'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).default('info'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().default('6379'),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_USERNAME: z.string().optional(),
  REDIS_TLS: z.string().optional(),
  REDIS_MAX_RETRIES: z.string().default('3'),
  REDIS_RETRY_DELAY: z.string().default('1000'),
  CORS_ORIGINS: z.string().default('http://localhost:5173,http://127.0.0.1:5173'),
  COMPRESSION_LEVEL: z.string().transform(Number).default('6'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export const validateEnv = (): EnvConfig => {
  try {
    const config = envSchema.parse(process.env);
    logger.info('✅ Variáveis de ambiente validadas com sucesso');
    return config;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path}: ${err.message}`).join('\n');
      logger.error('❌ Erro na validação das variáveis de ambiente:\n' + errors);
    } else {
      logger.error('❌ Erro inesperado na validação das variáveis de ambiente:', error);
    }
    process.exit(1);
  }
};

const env = envSchema.parse(process.env);

export { env };
