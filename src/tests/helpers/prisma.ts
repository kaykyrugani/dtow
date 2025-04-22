import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const mockPrismaError = (code: string, meta?: Record<string, any>) => {
  const error = new Error('Prisma Error');
  Object.setPrototypeOf(error, PrismaClientKnownRequestError.prototype);
  Object.assign(error, {
    code,
    meta,
    name: 'PrismaClientKnownRequestError',
    message: `Prisma error with code ${code}`,
  });
  return error as PrismaClientKnownRequestError;
};

export const mockDuplicateEmailError = () => {
  return mockPrismaError('P2002', { target: ['email'] });
};

export const mockNotFoundError = () => {
  return mockPrismaError('P2025');
};

export const mockValidationError = () => {
  return mockPrismaError('P2001');
};
