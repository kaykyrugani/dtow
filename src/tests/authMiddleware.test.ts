import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { mockPrisma } from './setup';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

describe('AuthMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  it('deve retornar 401 quando não houver token', async () => {
    await authMiddleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Token ausente',
        statusCode: 401,
      }),
    );
  });

  it('deve retornar 401 quando o token for inválido', async () => {
    req.headers = { authorization: 'Bearer invalid' };
    await authMiddleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Token inválido ou expirado',
        statusCode: 401,
      }),
    );
  });

  it('deve retornar 401 quando o token estiver expirado', async () => {
    req.headers = { authorization: 'Bearer expired' };
    await authMiddleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Token inválido ou expirado',
        statusCode: 401,
      }),
    );
  });

  it('deve chamar next() quando o token for válido', async () => {
    const mockUser = {
      id: 1,
      nome: 'Test User',
      email: 'test@example.com',
      tipoUsuario: 'cliente',
    };

    req.headers = { authorization: 'Bearer valid.token' };
    mockPrisma.usuario.findUnique.mockResolvedValueOnce(mockUser);

    await authMiddleware(req as Request, res as Response, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalledWith();
  });
});
