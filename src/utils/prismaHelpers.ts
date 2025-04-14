import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from './AppError';
import { ERROR_CODES } from '../constants/errorMessages';
import { HttpStatusCode } from '../constants/httpCodes';

export type PrismaErrorMeta = {
  target?: string[];
  [key: string]: unknown;
};

export const isPrismaError = (error: unknown): error is PrismaClientKnownRequestError => {
  return error instanceof PrismaClientKnownRequestError;
};

export const getPrismaErrorField = (error: PrismaClientKnownRequestError): string => {
  const meta = error.meta as PrismaErrorMeta;
  return Array.isArray(meta?.target) ? meta.target[0] : 'campo';
};

export const handlePrismaError = (error: unknown): never => {
  if (isPrismaError(error)) {
    const field = getPrismaErrorField(error);
    
    switch (error.code) {
      case 'P2002':
        throw new AppError(
          ERROR_CODES.DUPLICATE_ENTRY,
          HttpStatusCode.CONFLICT,
          { field }
        );
      case 'P2025':
        throw new AppError(
          ERROR_CODES.NOT_FOUND,
          HttpStatusCode.NOT_FOUND
        );
      default:
        throw new AppError(
          ERROR_CODES.INTERNAL_ERROR,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          { prismaCode: error.code }
        );
    }
  }
  
  if (error instanceof Error) {
    throw new AppError(
      ERROR_CODES.INTERNAL_ERROR,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      { message: error.message }
    );
  }
  
  throw new AppError(
    ERROR_CODES.INTERNAL_ERROR,
    HttpStatusCode.INTERNAL_SERVER_ERROR
  );
}; 