import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpCodes';

export const errorHandler = (
  error: Error | PrismaClientKnownRequestError | ZodError | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // AppError personalizado
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      code: error.code,
      message: error.message,
      ...(error.details && { details: error.details }),
    });
  }

  // Erros JWT
  if (error instanceof TokenExpiredError) {
    const appError = AppError.tokenExpired();
    return res.status(appError.statusCode).json({
      status: 'error',
      code: appError.code,
      message: appError.message,
    });
  }

  if (error instanceof JsonWebTokenError) {
    const appError = AppError.tokenInvalid();
    return res.status(appError.statusCode).json({
      status: 'error',
      code: appError.code,
      message: appError.message,
    });
  }

  // Erros do Prisma
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': {
        const appError = AppError.conflict({ field: error.meta?.target });
        return res.status(appError.statusCode).json({
          status: 'error',
          code: appError.code,
          message: appError.message,
          details: appError.details,
        });
      }
      case 'P2025': {
        const appError = AppError.notFound();
        return res.status(appError.statusCode).json({
          status: 'error',
          code: appError.code,
          message: appError.message,
        });
      }
      default: {
        const appError = AppError.internal({
          prismaCode: error.code,
          details: error.message,
        });
        return res.status(appError.statusCode).json({
          status: 'error',
          code: appError.code,
          message: appError.message,
          details: appError.details,
        });
      }
    }
  }

  // Erros de validação Zod
  if (error instanceof ZodError) {
    const appError = AppError.validationError({
      errors: error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return res.status(appError.statusCode).json({
      status: 'error',
      code: appError.code,
      message: appError.message,
      details: appError.details,
    });
  }

  // Erro genérico
  console.error(error);

  const appError = AppError.internal({
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      detail: error.message,
    }),
  });

  return res.status(appError.statusCode).json({
    status: 'error',
    code: appError.code,
    message: appError.message,
    ...(appError.details && { details: appError.details }),
  });
};
