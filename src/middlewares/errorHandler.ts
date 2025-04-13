import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpCodes';
import { ERROR_MESSAGES } from '../constants/errorMessages';

interface ErrorResponse {
  status: 'error';
  message: string;
  code?: string;
  details?: unknown;
  stack?: string;
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error(error);

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: ERROR_MESSAGES.INTERNAL_ERROR
  });
}

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