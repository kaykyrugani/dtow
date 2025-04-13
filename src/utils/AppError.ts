import { ERROR_CODES, ERROR_MESSAGES, ErrorCodeKey, getErrorMessage } from '../constants/errorMessages';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: any;

  constructor(code: ErrorCodeKey, statusCode: number, details?: any) {
    super(getErrorMessage(code));
    this.name = 'AppError';
    this.code = ERROR_CODES[code];
    this.statusCode = statusCode;
    this.details = details;
  }

  static notFound(details?: any) {
    return new AppError('NOT_FOUND', 404, details);
  }

  static unauthorized(details?: any) {
    return new AppError('UNAUTHORIZED', 401, details);
  }

  static validationError(details?: any) {
    return new AppError('VALIDATION_ERROR', 400, details);
  }

  static internal(details?: any) {
    return new AppError('INTERNAL_ERROR', 500, details);
  }

  static conflict(details?: any) {
    return new AppError('DUPLICATE_ENTRY', 409, details);
  }

  static tokenExpired(details?: any) {
    return new AppError('TOKEN_EXPIRED', 401, details);
  }

  static tokenInvalid(details?: any) {
    return new AppError('TOKEN_INVALID', 401, details);
  }
} 