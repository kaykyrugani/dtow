import { HttpStatusCode } from './HttpStatusCode';

export class AppError extends Error {
  public readonly statusCode: HttpStatusCode;

  constructor(message: string, statusCode: HttpStatusCode = HttpStatusCode.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
} 