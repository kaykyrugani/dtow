import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { mockPrisma } from './setup';
import { authMiddleware } from '../middlewares/authMiddleware';
import { AppError } from '../utils/AppError';

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrisma)
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn()
  }
}));

vi.mock('../lib/prisma');

describe('AuthMiddleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    mockNext = vi.fn();
  });

  it('deve retornar 401 quando não houver token', async () => {
    await authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Token não fornecido',
    });
  });

  it('deve retornar 401 quando o token estiver expirado', async () => {
    mockReq.headers = {
      authorization: 'Bearer expired',
    };

    await authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Token expirado',
    });
  });

  it('deve retornar 401 quando o token for inválido', async () => {
    mockReq.headers = {
      authorization: 'Bearer invalid',
    };

    await authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Token inválido',
    });
  });

  it('deve chamar next() quando o token for válido', async () => {
    mockReq.headers = {
      authorization: 'Bearer valid_token',
    };

    await authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockReq.user).toEqual({
      id: 1,
      tipoUsuario: 'cliente',
    });
  });
}); 