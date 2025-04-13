import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECURITY } from '../config/constants';
import { AppError } from '../utils/AppError';
import { ErrorMessages } from '../utils/errorConstants';
import { LoggerService } from '../utils/LoggerService';

interface JWTPayload {
  userId: number;
  email: string;
  roles?: string[];
  iat?: number;
  exp?: number;
}

export const authMiddleware = (requiredRoles?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = extractTokenFromHeader(req);
      
      if (!token) {
        throw AppError.unauthorized(ErrorMessages.MISSING_TOKEN);
      }

      const payload = verifyToken(token) as JWTPayload;
      
      if (requiredRoles?.length && !hasRequiredRoles(payload.roles, requiredRoles)) {
        throw AppError.unauthorized(ErrorMessages.INSUFFICIENT_PERMISSIONS);
      }

      // Anexa o payload decodificado à requisição
      req.user = payload;
      
      next();
    } catch (error) {
      handleAuthError(error, next);
    }
  };
};

function extractTokenFromHeader(req: Request): string | null {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.split(' ')[1];
}

function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, SECURITY.JWT_SECRET) as JWTPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw AppError.unauthorized(ErrorMessages.INVALID_TOKEN);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw AppError.unauthorized(ErrorMessages.INVALID_TOKEN);
    }
    throw error;
  }
}

function hasRequiredRoles(userRoles: string[] = [], requiredRoles: string[]): boolean {
  return requiredRoles.some(role => userRoles.includes(role));
}

function handleAuthError(error: unknown, next: NextFunction) {
  if (error instanceof AppError) {
    next(error);
    return;
  }

  LoggerService.error('Erro de autenticação:', error);
  next(AppError.unauthorized(ErrorMessages.UNAUTHORIZED));
}

// Extensão do tipo Request do Express para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
} 