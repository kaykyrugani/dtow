import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export interface PrismaErrorMeta {
  target?: string[];
  [key: string]: any;
}

export type PrismaErrorCode =
  | 'P2002' // Unique constraint violation
  | 'P2025' // Record not found
  | 'P2003' // Foreign key constraint violation
  | string; // Other Prisma error codes

export interface PrismaError extends Error {
  code: string;
  clientVersion: string;
  meta?: PrismaErrorMeta;
}

export type DatabaseErrorHandler = (error: PrismaError) => never;
