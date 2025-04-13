import { ERROR_MESSAGES, ErrorMessageKey } from '../constants/errorMessages';
import { HttpStatusCode, HttpStatusCodeType } from '../constants/httpCodes';

export class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: HttpStatusCodeType;

  constructor(messageKey: ErrorMessageKey, statusCode: HttpStatusCodeType) {
    const message = ERROR_MESSAGES[messageKey];
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }

  static notFound() {
    return new AppError('NOT_FOUND', HttpStatusCode.NOT_FOUND);
  }

  static unauthorized() {
    return new AppError('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED);
  }

  static validationError() {
    return new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST);
  }

  static internal() {
    return new AppError('INTERNAL_ERROR', HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
} 