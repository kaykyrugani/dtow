import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { HttpStatusCode } from '../errors/HttpStatusCode';

export function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { user } = request;

  if (!user || user.tipo !== 'ADMIN') {
    throw new AppError('Acesso não autorizado', HttpStatusCode.FORBIDDEN);
  }

  return next();
} 