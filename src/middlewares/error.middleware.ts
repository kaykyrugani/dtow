import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpStatusCode';
import { ZodError } from 'zod';

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      error: {
        message: error.message,
        code: error.code,
      },
    });
  }

  if (error instanceof ZodError) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      error: {
        message: 'Dados inválidos',
        code: 'VALIDATION_ERROR',
        details: error.errors,
      },
    });
  }

  console.error(error);

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    error: {
      message: 'Erro interno do servidor',
      code: 'INTERNAL_SERVER_ERROR',
    },
  });
};
