import { describe, it, expect, beforeEach } from 'vitest';
import { z } from 'zod';
import { errorMiddleware } from '../middlewares/error.middleware';
import { AppError } from '../utils/AppError';
import { ErrorMessages } from '../utils/errorConstants';
import {
  createMockRequest,
  createMockResponse,
  mockNext,
  mockPrismaError
} from './setup';

describe('ErrorMiddleware', () => {
  let req = createMockRequest();
  let res = createMockResponse();

  beforeEach(() => {
    req = createMockRequest();
    res = createMockResponse();
    mockNext.mockClear();
  });

  describe('AppError Handling', () => {
    it('deve tratar AppError corretamente', () => {
      const error = new AppError('INVALID_DATA', 400, { field: 'email' });

      errorMiddleware(error, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ErrorMessages.INVALID_DATA,
        details: { field: 'email' }
      });
    });

    it('deve tratar AppError sem detalhes', () => {
      const error = new AppError('UNAUTHORIZED', 401);

      errorMiddleware(error, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ErrorMessages.UNAUTHORIZED
      });
    });
  });

  describe('Zod Error Handling', () => {
    it('deve tratar erros de validação do Zod', () => {
      const schema = z.object({
        email: z.string().email(),
        age: z.number().min(18)
      });

      const error = schema.safeParse({ email: 'invalid', age: 16 }).error;

      errorMiddleware(error, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ErrorMessages.VALIDATION_ERROR,
        details: expect.arrayContaining([
          expect.objectContaining({
            field: expect.any(String),
            message: expect.any(String)
          })
        ])
      });
    });
  });

  describe('Prisma Error Handling', () => {
    it('deve tratar erro de registro duplicado', () => {
      const error = mockPrismaError('P2002');

      errorMiddleware(error, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ErrorMessages.DUPLICATE_ENTRY,
        code: 'P2002'
      });
    });

    it('deve tratar erro de registro não encontrado', () => {
      const error = mockPrismaError('P2025');

      errorMiddleware(error, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ErrorMessages.RECORD_NOT_FOUND,
        code: 'P2025'
      });
    });
  });

  describe('Generic Error Handling', () => {
    it('deve tratar erros genéricos em produção', () => {
      process.env.NODE_ENV = 'production';
      const error = new Error('Erro interno');

      errorMiddleware(error, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ErrorMessages.INTERNAL_ERROR
      });
    });

    it('deve incluir detalhes do erro em desenvolvimento', () => {
      process.env.NODE_ENV = 'development';
      const error = new Error('Erro de teste');
      error.stack = 'Error stack trace';

      errorMiddleware(error, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ErrorMessages.INTERNAL_ERROR,
        error: 'Erro de teste',
        stack: 'Error stack trace'
      });
    });
  });
}); 