import { ErrorCode, ErrorMessages } from './errorConstants';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: any;

  constructor(code: ErrorCode, statusCode = 400, details?: any) {
    super(ErrorMessages[code]);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }

  static notFound(details?: any) {
    return new AppError('RECORD_NOT_FOUND', 404, details);
  }

  static unauthorized(details?: any) {
    return new AppError('UNAUTHORIZED', 401, details);
  }

  static invalidData(details?: any) {
    return new AppError('INVALID_DATA', 400, details);
  }

  static internal(details?: any) {
    return new AppError('INTERNAL_ERROR', 500, details);
  }
} 