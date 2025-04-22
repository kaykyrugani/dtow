export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_ORDER = 'desc';

export const REQUEST_TIMEOUT = 30000; // 30 segundos

export const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por windowMs
};

export const SECURITY = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: '1d',
  BCRYPT_ROUNDS: 10,
  CORS_ORIGINS: ['http://localhost:3000'],
};

export const SENSITIVE_FIELDS = [
  'password',
  'senha',
  'token',
  'secret',
  'key',
  'authorization',
  'cookie',
];
