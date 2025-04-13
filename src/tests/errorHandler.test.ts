import { describe, beforeEach, test, expect, vi } from 'vitest';
import { errorHandler, AppError } from '../middlewares/errorHandler';
import { ZodError } from 'zod';
import { Prisma } from '../generated/prisma';

describe('Error Handler Middleware', () => {
  const mockReq = {} as any;
  const mockRes = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  } as any;
  const mockNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('deve tratar AppError corretamente', () => {
    const error = new AppError('Erro personalizado', 400, { campo: 'detalhes' });

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Erro personalizado',
      details: { campo: 'detalhes' }
    });
  });

  test('deve tratar ZodError corretamente', () => {
    const error = new ZodError([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['email'],
        message: 'Email é obrigatório'
      }
    ]);

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Erro de validação',
      errors: error.errors
    });
  });

  test('deve tratar erro de registro duplicado do Prisma', () => {
    const error = new Prisma.PrismaClientKnownRequestError('', {
      code: 'P2002',
      clientVersion: '4.0.0'
    });

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(409);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Registro duplicado'
    });
  });

  test('deve tratar erro de registro não encontrado do Prisma', () => {
    const error = new Prisma.PrismaClientKnownRequestError('', {
      code: 'P2025',
      clientVersion: '4.0.0'
    });

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Não encontrado'
    });
  });

  test('deve tratar erros não identificados em produção', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const error = new Error('Erro interno detalhado');

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Erro interno do servidor'
    });

    process.env.NODE_ENV = originalEnv;
  });

  test('deve mostrar detalhes do erro em desenvolvimento', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const error = new Error('Erro interno detalhado');

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: error.message
    });

    process.env.NODE_ENV = originalEnv;
  });

  test('deve tratar erro de não autorizado', () => {
    const error = new Error('Não autorizado');

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Não autorizado'
    });
  });

  test('deve tratar erro de proibido', () => {
    const error = new Error('Proibido');

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Proibido'
    });
  });

  test('deve tratar erros não identificados', () => {
    const error = new Error('Erro qualquer');

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Erro interno do servidor'
    });
  });
}); 