import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import logger from '../utils/logger';
import { AppError } from '../utils/AppError';
import safeStringify from 'safe-stable-stringify';

const SENSITIVE_FIELDS = ['senha', 'password', 'token', 'authorization', 'cpf', 'rg'];
const TIMEOUT_MS = process.env.NODE_ENV === 'production' ? 30000 : 5000;

// Função para sanitizar dados sensíveis
const sanitizeData = (data: any): any => {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }

  if (typeof data === 'object') {
    return Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: SENSITIVE_FIELDS.includes(key.toLowerCase())
          ? '[REDACTED]'
          : typeof value === 'object'
            ? sanitizeData(value)
            : value,
      }),
      {},
    );
  }

  return data;
};

// Configuração do Rate Limiter
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: process.env.NODE_ENV === 'test' ? 1000 : 100,
  message: { error: 'Muitas requisições deste IP, tente novamente após 15 minutos' },
  handler: (req, res) => {
    logger.warn(
      'Rate limit excedido',
      sanitizeData({
        ip: req.ip,
        path: req.path,
        timestamp: new Date().toISOString(),
      }),
    );
    res.status(429).json({ error: 'Muitas requisições deste IP, tente novamente após 15 minutos' });
  },
});

// Middleware de timeout
export const timeoutMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timeoutId = setTimeout(() => {
    if (!res.headersSent) {
      res.status(408).json({
        status: 'error',
        message: 'Request timeout',
      });
    }
  }, TIMEOUT_MS);

  res.on('finish', () => clearTimeout(timeoutId));
  res.on('close', () => clearTimeout(timeoutId));

  next();
};

// Headers de segurança básicos
export const securityHeaders = (_req: Request, res: Response, next: NextFunction) => {
  // Proteção contra XSS
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Previne clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Previne MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Strict Transport Security
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  // Content Security Policy
  res.setHeader('Content-Security-Policy', "default-src 'self'");

  next();
};

// Middleware para métodos HTTP permitidos
export const allowedMethods = (req: Request, res: Response, next: NextFunction) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  if (!allowedMethods.includes(req.method)) {
    logger.warn('Método não permitido', {
      method: req.method,
      path: req.path,
    });
    return res.status(405).json({ error: 'Método não permitido' });
  }
  next();
};

// Middleware de segurança principal
export const securityMiddleware = [
  // Headers de segurança básicos
  securityHeaders,

  // Rate limiting
  limiter,

  // Timeout para requisições longas
  timeoutMiddleware,

  // Middleware para métodos HTTP permitidos
  allowedMethods,

  // Sanitização de logs
  (req: Request, res: Response, next: NextFunction) => {
    const sanitizedReq = {
      method: req.method,
      path: req.path,
      headers: sanitizeData(req.headers),
      query: sanitizeData(req.query),
      body: sanitizeData(req.body),
      params: sanitizeData(req.params),
    };

    logger.info('Request recebida', sanitizedReq);
    next();
  },
];

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    const logData = {
      timestamp: new Date().toISOString(),
      duration,
      request: {
        method: req.method,
        url: req.url,
        query: sanitizeData(req.query),
        body: sanitizeData(req.body),
        headers: sanitizeData(req.headers),
      },
      response: {
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
      },
    };

    console.log(safeStringify(logData));
  });

  next();
};

export const securityMiddlewareWithLogger = [...securityMiddleware, loggerMiddleware];
