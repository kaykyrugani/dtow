import { Prisma } from '@prisma/client';
import { PrismaErrorCodes } from '../types/shared';
import { HttpStatusCode } from '../constants/httpCodes';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { AppError } from './AppError';

export class PrismaErrorHandler {
  static handle(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case PrismaErrorCodes.UNIQUE_CONSTRAINT:
          throw new AppError(ERROR_MESSAGES.EMAIL_DUPLICATED, HttpStatusCode.CONFLICT);
        case PrismaErrorCodes.NOT_FOUND:
          throw new AppError(ERROR_MESSAGES.NOT_FOUND, HttpStatusCode.NOT_FOUND);
        default:
          throw new AppError(ERROR_MESSAGES.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
    }

    if (error instanceof Error) {
      throw new AppError(error.message, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }

    throw new AppError(ERROR_MESSAGES.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
}
