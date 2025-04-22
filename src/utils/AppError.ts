import { getErrorMessage, ERROR_CODES } from '../constants/errorMessages';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }

  static notFound(message?: string): AppError {
    return new AppError(
      404,
      ERROR_CODES.NOT_FOUND,
      message || getErrorMessage(ERROR_CODES.NOT_FOUND),
    );
  }

  static unauthorized(message?: string): AppError {
    return new AppError(
      401,
      ERROR_CODES.UNAUTHORIZED,
      message || getErrorMessage(ERROR_CODES.UNAUTHORIZED),
    );
  }

  static validationError(message?: string): AppError {
    return new AppError(
      400,
      ERROR_CODES.VALIDATION_ERROR,
      message || getErrorMessage(ERROR_CODES.VALIDATION_ERROR),
    );
  }

  static internal(message?: string): AppError {
    return new AppError(
      500,
      ERROR_CODES.INTERNAL_ERROR,
      message || getErrorMessage(ERROR_CODES.INTERNAL_ERROR),
    );
  }

  static conflict(message?: string): AppError {
    return new AppError(
      409,
      ERROR_CODES.DUPLICATE_ENTRY,
      message || getErrorMessage(ERROR_CODES.DUPLICATE_ENTRY),
    );
  }

  static tokenExpired(message?: string): AppError {
    return new AppError(
      401,
      ERROR_CODES.TOKEN_EXPIRED,
      message || getErrorMessage(ERROR_CODES.TOKEN_EXPIRED),
    );
  }

  static tokenInvalid(message?: string): AppError {
    return new AppError(
      401,
      ERROR_CODES.TOKEN_INVALID,
      message || getErrorMessage(ERROR_CODES.TOKEN_INVALID),
    );
  }
}
