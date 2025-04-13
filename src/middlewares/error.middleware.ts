import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/AppError';
import { ErrorMessages } from '../utils/errorConstants';
import { LoggerService } from '../utils/LoggerService';

interface ErrorResponse {
  status: string;
  message: string;
  details?: any;
}

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  LoggerService.error('Error Handler:', error);

  // AppError personalizado
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      status: 'error',
      message: error.message
    };
    
    if (error.details) {
      response.details = error.details;
    }
    
    return res.status(error.statusCode).json(response);
  }

  // Erro de validação do Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: ErrorMessages.VALIDATION_ERROR,
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }

  // Erros do Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(error);
    return res.status(prismaError.statusCode).json({
      status: 'error',
      message: prismaError.message,
      code: error.code
    });
  }

  // Erro não tratado
  const isDev = process.env.NODE_ENV === 'development';
  
  return res.status(500).json({
    status: 'error',
    message: ErrorMessages.INTERNAL_ERROR,
    ...(isDev && {
      error: error.message,
      stack: error.stack
    })
  });
};

function handlePrismaError(error: Prisma.PrismaClientKnownRequestError): { statusCode: number; message: string } {
  switch (error.code) {
    case 'P2002':
      return {
        statusCode: 409,
        message: ErrorMessages.DUPLICATE_ENTRY
      };
    case 'P2025':
      return {
        statusCode: 404,
        message: ErrorMessages.RECORD_NOT_FOUND
      };
    case 'P2003':
      return {
        statusCode: 400,
        message: ErrorMessages.INVALID_DATA
      };
    default:
      return {
        statusCode: 500,
        message: ErrorMessages.DATABASE_ERROR
      };
  }
} 