import { z } from 'zod';
import { AppError } from './AppError';

export class Validator {
  static async validate<T>(schema: z.Schema<T>, data: unknown): Promise<T> {
    try {
      return await schema.parseAsync(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => err.message);
        throw new AppError(errors.join(', '), 400);
      }
      throw error;
    }
  }

  static validateSync<T>(schema: z.Schema<T>, data: unknown): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => err.message);
        throw new AppError(errors.join(', '), 400);
      }
      throw error;
    }
  }

  static validatePartial<T extends z.ZodObject<any>>(schema: T, data: unknown): Partial<z.infer<T>> {
    return this.validateSync(schema.partial(), data);
  }
}

export const validate = Validator.validate; 