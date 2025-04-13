import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../../middlewares/error.handler';
import { AppError } from '../../utils/AppError';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

describe('ErrorHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    next = vi.fn();
  });

  it('deve tratar AppError corretamente', () => {
    // Arrange
    const error = new AppError('Erro customizado', 400, { field: 'test' });

    // Act
    errorHandler(error, req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Erro customizado',
      details: { field: 'test' }
    });
  });

  it('deve tratar TokenExpiredError corretamente', () => {
    // Arrange
    const error = new TokenExpiredError('Token expirado', new Date());

    // Act
    errorHandler(error, req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Token expirado'
    });
  });

  it('deve tratar JsonWebTokenError corretamente', () => {
    // Arrange
    const error = new JsonWebTokenError('Token inválido');

    // Act
    errorHandler(error, req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Token inválido'
    });
  });

  it('deve tratar PrismaClientKnownRequestError (P2002) corretamente', () => {
    // Arrange
    const error = new PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: '4.0.0',
      meta: { target: ['email'] }
    });

    // Act
    errorHandler(error, req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Registro duplicado',
      field: ['email']
    });
  });

  it('deve tratar PrismaClientKnownRequestError (P2025) corretamente', () => {
    // Arrange
    const error = new PrismaClientKnownRequestError('Record not found', {
      code: 'P2025',
      clientVersion: '4.0.0',
      meta: {}
    });

    // Act
    errorHandler(error, req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Registro não encontrado'
    });
  });

  it('deve tratar ZodError corretamente', () => {
    // Arrange
    const error = new ZodError([{
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: ['email'],
      message: 'Email é obrigatório'
    }]);

    // Act
    errorHandler(error, req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Erro de validação',
      errors: [{
        field: 'email',
        message: 'Email é obrigatório'
      }]
    });
  });

  it('deve tratar erros genéricos em produção', () => {
    // Arrange
    const error = new Error('Erro interno');
    process.env.NODE_ENV = 'production';

    // Act
    errorHandler(error, req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Erro interno do servidor'
    });

    // Cleanup
    process.env.NODE_ENV = 'test';
  });

  it('deve incluir stack trace em desenvolvimento', () => {
    // Arrange
    const error = new Error('Erro interno');
    process.env.NODE_ENV = 'development';

    // Act
    errorHandler(error, req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Erro interno do servidor',
      stack: error.stack,
      detail: error.message
    });

    // Cleanup
    process.env.NODE_ENV = 'test';
  });
}); 