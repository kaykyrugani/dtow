import { Request, Response, NextFunction } from 'express';
import xss from 'xss-clean';
import { logger } from '../config/logger';

/**
 * Middleware para sanitização de inputs
 * Protege contra ataques XSS e injeção de código
 */
export const sanitizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Sanitiza o corpo da requisição
    if (req.body) {
      req.body = sanitizeObject(req.body);
    }

    // Sanitiza os parâmetros de query
    if (req.query) {
      req.query = sanitizeObject(req.query);
    }

    // Sanitiza os parâmetros de rota
    if (req.params) {
      req.params = sanitizeObject(req.params);
    }

    // Aplica xss-clean para remover scripts maliciosos
    xss()(req, res, next);
  } catch (error) {
    logger.error('Erro ao sanitizar inputs', { error });
    next(error);
  }
};

/**
 * Função recursiva para sanitizar objetos
 * Remove caracteres perigosos e normaliza strings
 */
function sanitizeObject(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (typeof obj === 'object') {
    const sanitizedObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitizedObj[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitizedObj;
  }

  return obj;
}

/**
 * Sanitiza uma string removendo caracteres perigosos
 */
function sanitizeString(str: string): string {
  // Remove caracteres de controle
  let sanitized = str.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  
  // Remove tags HTML
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Remove caracteres especiais que podem ser usados para injeção
  sanitized = sanitized.replace(/[;'"\\]/g, '');
  
  // Normaliza espaços em branco
  sanitized = sanitized.replace(/\s+/g, ' ').trim();
  
  return sanitized;
} 