import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Express } from 'express';
import logger from '../utils/logger';

// Rate limiter global
export const globalLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  message: { erro: 'Muitas requisições. Tente novamente mais tarde.' }
});

// Rate limiter específico para autenticação
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas
  message: { erro: 'Muitas tentativas de login. Tente novamente em 15 minutos.' }
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
  // Configuração do Helmet para headers de segurança
  app.use(helmet());

  // Rate Limiting para prevenir ataques de força bruta
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por IP
    message: 'Muitas requisições deste IP. Tente novamente mais tarde.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn('Rate limit excedido', {
        ip: req.ip,
        path: req.path
      });
      res.status(429).json({
        success: false,
        message: 'Muitas requisições — tente novamente mais tarde.'
      });
    }
  });

  // Aplicar rate limit em todas as rotas
  app.use(limiter);

  // Configurações adicionais de segurança
  app.disable('x-powered-by');
  
  logger.info('Middlewares de segurança configurados');
} 