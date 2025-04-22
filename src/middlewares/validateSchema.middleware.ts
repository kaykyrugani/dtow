import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpStatusCode';

export const validateSchema = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return next(new AppError('Dados inválidos', HttpStatusCode.BAD_REQUEST, 'VALIDATION_ERROR'));
    }
  };
};
