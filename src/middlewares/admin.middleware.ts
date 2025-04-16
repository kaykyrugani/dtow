import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpStatusCode';

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tipo } = req.user;

  if (tipo !== 'ADMIN') {
    throw new AppError(
      'Acesso negado',
      HttpStatusCode.FORBIDDEN,
      'FORBIDDEN'
    );
  }

  return next();
}; 