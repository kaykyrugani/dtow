import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('1d'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
  COMPRESSION_LEVEL: z.number().default(6),
  MERCADO_PAGO_ACCESS_TOKEN: z.string(),
  MERCADO_PAGO_PUBLIC_KEY: z.string(),
  MERCADO_PAGO_WEBHOOK_SECRET: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
});

const env = envSchema.parse(process.env);

export const config = {
  env: env.NODE_ENV,
  port: parseInt(env.PORT, 10),
  databaseUrl: env.DATABASE_URL,
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
  redis: {
    url: env.REDIS_URL,
  },
  cors: {
    origins: env.CORS_ORIGINS.split(','),
  },
  compression: {
    level: env.COMPRESSION_LEVEL,
  },
  mercadoPago: {
    accessToken: env.MERCADO_PAGO_ACCESS_TOKEN,
    publicKey: env.MERCADO_PAGO_PUBLIC_KEY,
    webhookSecret: env.MERCADO_PAGO_WEBHOOK_SECRET,
  },
  smtp: {
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT, 10),
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    from: env.SMTP_FROM,
  },
} as const; 