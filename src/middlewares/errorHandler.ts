import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Erro de validação',
      errors: error.errors,
    });
  }

  logger.error('Erro interno:', error);

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
  });
};
