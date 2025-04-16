import { z } from 'zod';
import { createLogger, transports } from 'winston';

// Logger temporário para erros de inicialização
const setupLogger = createLogger({
  level: 'warn',
  transports: [new transports.Console()]
});

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.number(),
  LOGTAIL_API_KEY: z.string().optional(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.number(),
  SMTP_SECURE: z.boolean().default(false),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string().default('noreply@onlywave.com.br'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).default('info')
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  LOGTAIL_API_KEY: process.env.LOGTAIL_API_KEY,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_FROM: process.env.SMTP_FROM,
  LOG_LEVEL: process.env.LOG_LEVEL
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  try {
    const env = envSchema.parse(process.env);
    setupLogger.info('✅ Variáveis de ambiente validadas com sucesso');
    return env;
  } catch (error) {
    setupLogger.error('❌ Erro na validação das variáveis de ambiente:', {
      errors: error.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }))
    });
    throw error;
  }
}

// Exporta o objeto env já validado
export const config = validateEnv(); 