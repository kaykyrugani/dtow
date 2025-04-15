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

// Configuração do Helmet
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "same-site" },
  dnsPrefetchControl: true,
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: { permittedPolicies: "none" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true,
});

// Headers de segurança adicionais
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Remove o header X-Powered-By
  res.removeHeader('X-Powered-By');

  // Headers de segurança básicos
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy mais restritiva
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "img-src 'self' data: https:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self'",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "block-all-mixed-content",
    "upgrade-insecure-requests"
  ].join('; '));

  next();
};

// Lista de métodos HTTP permitidos
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];

// Middleware para verificar métodos HTTP permitidos
export const allowedMethods = (req: Request, res: Response, next: NextFunction) => {
  if (!ALLOWED_METHODS.includes(req.method)) {
    logger.warn(`Método HTTP não permitido: ${req.method}`, {
      path: req.path,
      ip: req.ip
    });
    return res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({
      status: 'error',
      message: ERROR_MESSAGES.METHOD_NOT_ALLOWED
    });
  }
  next();
};

// Middleware de timeout
export const timeout = (req: Request, res: Response, next: NextFunction) => {
  const timeoutId = setTimeout(() => {
    logger.warn('Timeout na requisição', {
      path: req.path,
      ip: req.ip
    });
    res.status(HttpStatusCode.REQUEST_TIMEOUT).json({
      status: 'error',
      message: ERROR_MESSAGES.REQUEST_TIMEOUT
    });
  }, 30000);

  req.on('end', () => clearTimeout(timeoutId));
  next();
};

// Aplica todos os middlewares de segurança
export function applySecurityMiddleware(app: Express) {
  // Aplica o Helmet
  app.use(helmetConfig);

  // Aplica headers de segurança personalizados
  app.use(securityHeaders);

  // Aplica rate limiting
  app.use('/api/auth', authLimiter);
  app.use('/api', limiter);

  // Aplica verificação de métodos HTTP
  app.use(allowedMethods);

  // Aplica timeout
  app.use(timeout);

  logger.info('Middlewares de segurança aplicados com sucesso');
} 