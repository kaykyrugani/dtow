import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  error: Error | PrismaClientKnownRequestError | ZodError | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // AppError personalizado
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      ...(error.details && { details: error.details })
    });
  }

  // Erros JWT
  if (error instanceof TokenExpiredError) {
    return res.status(401).json({
      status: 'error',
      message: 'Token expirado'
    });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({
      status: 'error',
      message: 'Token inválido'
    });
  }

  // Erros do Prisma
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return res.status(409).json({
          status: 'error',
          message: 'Registro duplicado',
          field: error.meta?.target
        });
      case 'P2025':
        return res.status(404).json({
          status: 'error',
          message: 'Registro não encontrado'
        });
      default:
        return res.status(400).json({
          status: 'error',
          message: 'Erro na operação do banco de dados',
          code: error.code
        });
    }
  }

  // Erros de validação Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Erro de validação',
      errors: error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }

  // Erro genérico
  console.error(error);
  
  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      detail: error.message
    })
  });
}; 