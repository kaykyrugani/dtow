import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

interface ErrorResponse {
  status: 'error';
  message: string;
  code?: string;
  details?: unknown;
  stack?: string;
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  const isDev = process.env.NODE_ENV === 'development';
  
  // Log do erro
  console.error('Error:', {
    name: error.name,
    message: error.message,
    stack: isDev ? error.stack : undefined
  });

  // AppError personalizado
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      status: 'error',
      message: error.message,
      ...(error.details && { details: error.details }),
      ...(isDev && { stack: error.stack })
    };
    return res.status(error.statusCode).json(response);
  }

  // Erros de validação do Zod
  if (error instanceof ZodError) {
    const response: ErrorResponse = {
      status: 'error',
      message: 'Erro de validação',
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    };
    return res.status(400).json(response);
  }

  // Erros do Prisma
  if (error instanceof PrismaClientKnownRequestError) {
    const response: ErrorResponse = {
      status: 'error',
      code: error.code,
      message: getPrismaErrorMessage(error)
    };
    return res.status(getPrismaErrorStatus(error.code)).json(response);
  }

  // Erros de JWT
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

  // Erro genérico
  const response: ErrorResponse = {
    status: 'error',
    message: isDev ? error.message : 'Erro interno do servidor',
    ...(isDev && { stack: error.stack })
  };

  return res.status(500).json(response);
};

function getPrismaErrorMessage(error: PrismaClientKnownRequestError): string {
  switch (error.code) {
    case 'P2002':
      const target = error.meta?.target as string[];
      return `Registro duplicado encontrado: ${target?.join(', ')}`;
    case 'P2025':
      return 'Registro não encontrado';
    case 'P2003':
      return 'Violação de chave estrangeira';
    case 'P2014':
      return 'Violação de restrição de invalidação';
    case 'P2000':
      return 'Valor de entrada inválido';
    default:
      return 'Erro no banco de dados';
  }
}

function getPrismaErrorStatus(code: string): number {
  switch (code) {
    case 'P2002':
      return 409; // Conflict
    case 'P2025':
      return 404; // Not Found
    case 'P2000':
    case 'P2003':
    case 'P2014':
      return 400; // Bad Request
    default:
      return 500; // Internal Server Error
  }
} 