import { users, loginData, tokens } from '../fixtures/users';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from '../../utils/AppError';
import { ERROR_CODES } from '../../constants/errorMessages';
import { HttpStatusCode } from '../../constants/httpCodes';

export const createTestUser = (overrides = {}) => ({
  ...users.valid,
  ...overrides
});

export const createInvalidTestUser = (overrides = {}) => ({
  ...users.invalid,
  ...overrides
});

export const createTestLoginData = (overrides = {}) => ({
  ...loginData.valid,
  ...overrides
});

export const createInvalidLoginData = (overrides = {}) => ({
  ...loginData.invalid,
  ...overrides
});

export const createPrismaError = (
  code: string,
  message = 'Database error',
  meta?: Record<string, unknown>
): PrismaClientKnownRequestError => {
  return new PrismaClientKnownRequestError(
    message,
    {
      code,
      clientVersion: '5.x',
      meta: meta || {}
    }
  );
};

export const createDuplicateEntryError = (field: string) => 
  createPrismaError('P2002', 'Unique constraint failed', { target: [field] });

export const createNotFoundError = () =>
  createPrismaError('P2025', 'Record not found');

export const createValidationError = (field: string, message: string) =>
  new AppError(
    ERROR_CODES.VALIDATION_ERROR,
    HttpStatusCode.BAD_REQUEST,
    { errors: [{ field, message }] }
  );

export const createAuthError = () =>
  new AppError(
    ERROR_CODES.INVALID_CREDENTIALS,
    HttpStatusCode.UNAUTHORIZED
  );

export const createTokenError = (expired = false) =>
  new AppError(
    expired ? ERROR_CODES.TOKEN_EXPIRED : ERROR_CODES.TOKEN_INVALID,
    HttpStatusCode.BAD_REQUEST
  ); 