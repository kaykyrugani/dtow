import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Ambiente
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'ci').default('development'),
  PORT: Joi.number().default(3000),

  // Redis
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').default(''),
  REDIS_DB: Joi.number().default(0),
  REDIS_TTL: Joi.number().default(3600),

  // Cache
  CACHE_TTL: Joi.number().default(3600),
  CACHE_MAX: Joi.number().default(100),

  // Throttling
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(100),

  // Logging
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly')
    .default('info'),
  LOG_FORMAT: Joi.string().valid('json', 'pretty').default('json'),

  // Metrics
  METRICS_ENABLED: Joi.boolean().default(true),
  METRICS_PORT: Joi.number().default(9090),

  // Sentry
  SENTRY_DSN: Joi.string().allow('').default(''),

  // Swagger
  SWAGGER_TITLE: Joi.string().default('API de Pagamentos'),
  SWAGGER_DESCRIPTION: Joi.string().default('API para processamento de pagamentos'),
  SWAGGER_VERSION: Joi.string().default('1.0'),
  SWAGGER_TAG: Joi.string().default('payments'),
  SWAGGER_PATH: Joi.string().default('api'),

  // Database
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('postgres'),
  DB_DATABASE: Joi.string().default('payment_service'),
});
