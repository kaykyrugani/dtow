import { PrismaError, PrismaErrorMeta } from '../types/prisma';

export function createPrismaError(code: string, meta?: PrismaErrorMeta): PrismaError {
  const error = new Error('Mock Prisma Error') as PrismaError;
  error.code = code;
  error.clientVersion = '5.0.0';
  error.meta = meta || {};
  error.name = 'PrismaClientKnownRequestError';
  return error;
} 