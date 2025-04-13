import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Express } from 'express';
import logger from '../utils/logger';
import { HttpStatusCode } from '../constants/httpCodes';
import { ERROR_MESSAGES } from '../constants/errorMessages';

// Rate limiter global
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por windowMs
  message: {
    status: 'error',
    message: ERROR_MESSAGES.RATE_LIMIT_EXCEEDED
  },
  statusCode: HttpStatusCode.TOO_MANY_REQUESTS
});

// Rate limiter específico para autenticação
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // limite de 5 tentativas por hora
  message: {
    status: 'error',
    message: ERROR_MESSAGES.AUTH_LIMIT_EXCEEDED
  },
  statusCode: HttpStatusCode.TOO_MANY_REQUESTS,
  skipSuccessfulRequests: true // não conta requisições bem-sucedidas
});

// Headers de segurança
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Remove o header X-Powered-By
  res.removeHeader('X-Powered-By');

  // Headers de segurança básicos
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy básica
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "img-src 'self' data: https:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self'",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ].join('; '));

  // Strict Transport Security
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  next();
};

// Proteção contra métodos HTTP não permitidos
export const allowedMethods = (req: Request, res: Response, next: NextFunction) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
  
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({ 
      erro: 'Método não permitido',
      allowed: allowedMethods 
    });
  }

  next();
};

// Timeout para requisições longas
export const timeout = (req: Request, res: Response, next: NextFunction) => {
  res.setTimeout(30000, () => {
    res.status(408).json({ erro: 'Timeout da requisição' });
  });
  next();
};

export function applySecurityMiddleware(app: Express) {
  // Headers de segurança básicos
  app.use(helmet());

  // Headers específicos
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.frameguard({ action: 'deny' }));

  // Rate limiting global
  app.use(limiter);

  // Rate limiting específico para autenticação
  app.use('/auth/login', authLimiter);
  app.use('/auth/register', authLimiter);

  // Configurações adicionais de segurança
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  
  logger.info('Middlewares de segurança configurados');
} 