import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpCodes';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        throw AppError.validationError();
      }
      req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
}; 