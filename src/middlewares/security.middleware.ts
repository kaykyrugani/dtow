import { Request, Response, NextFunction } from 'express';
import { SECURITY, REQUEST_TIMEOUT, SENSITIVE_FIELDS } from '../config/constants';
import { AppError } from '../utils/AppError';
import { ErrorMessages } from '../utils/errorConstants';
import { LoggerService } from '../utils/LoggerService';

export const securityMiddleware = {
  /**
   * Middleware para timeout de requisição
   */
  timeout: (req: Request, res: Response, next: NextFunction) => {
    const timeoutId = setTimeout(() => {
      if (!res.headersSent) {
        next(AppError.internal(ErrorMessages.TIMEOUT_ERROR));
      }
    }, REQUEST_TIMEOUT);

    // Limpa o timeout quando a resposta for enviada
    res.on('finish', () => clearTimeout(timeoutId));
    res.on('close', () => clearTimeout(timeoutId));

    next();
  },

  /**
   * Middleware para sanitização de dados sensíveis
   */
  sanitizeData: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body) {
        req.body = sanitizeObject(req.body);
      }
      if (req.query) {
        req.query = sanitizeObject(req.query);
      }
      if (req.params) {
        req.params = sanitizeObject(req.params);
      }
      next();
    } catch (error) {
      LoggerService.error('Erro na sanitização:', error);
      next(error);
    }
  },

  /**
   * Middleware para configuração de headers de segurança
   */
  securityHeaders: (_req: Request, res: Response, next: NextFunction) => {
    // Previne clickjacking
    res.setHeader('X-Frame-Options', 'DENY');

    // Habilita proteção XSS do navegador
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Previne MIME-type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Configura CORS
    res.setHeader('Access-Control-Allow-Origin', SECURITY.CORS_ORIGINS.join(', '));
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Remove header que expõe informações do servidor
    res.removeHeader('X-Powered-By');

    next();
  },
};

/**
 * Função auxiliar para sanitizar objetos recursivamente
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): Record<string, any> {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (SENSITIVE_FIELDS.includes(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => (typeof item === 'object' ? sanitizeObject(item) : item));
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}
