import { describe, it, expect, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { mockPrisma } from '../mocks/prisma.mock';
import { mockJWT } from '../mocks/jwt.mock';
import { AppError } from '../../utils/AppError';

vi.mock('../../config/prisma', () => ({
  getPrismaInstance: () => mockPrisma,
}));

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
  });

  it('deve retornar erro quando token não é fornecido', async () => {
    // Act
    await authMiddleware(req as Request, res as Response, next);

    // Assert
    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Token ausente',
        statusCode: 401,
      }),
    );
  });

  it('deve retornar erro quando token está expirado', async () => {
    // Arrange
    req.headers = {
      authorization: 'Bearer expired',
    };

    // Act
    await authMiddleware(req as Request, res as Response, next);

    // Assert
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Token expirado',
        statusCode: 401,
      }),
    );
  });

  it('deve retornar erro quando token é inválido', async () => {
    // Arrange
    req.headers = {
      authorization: 'Bearer invalid',
    };

    // Act
    await authMiddleware(req as Request, res as Response, next);

    // Assert
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Token inválido',
        statusCode: 401,
      }),
    );
  });

  it('deve retornar erro quando usuário não é encontrado', async () => {
    // Arrange
    req.headers = {
      authorization: 'Bearer valid.token',
    };
    mockPrisma.usuario.findUnique.mockResolvedValue(null);

    // Act
    await authMiddleware(req as Request, res as Response, next);

    // Assert
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Usuário não encontrado',
        statusCode: 401,
      }),
    );
  });

  it('deve prosseguir com a requisição quando token é válido', async () => {
    // Arrange
    req.headers = {
      authorization: 'Bearer valid.token',
    };
    const mockUser = {
      id: 1,
      nome: 'Test User',
      email: 'test@example.com',
      tipoUsuario: 'cliente',
    };
    mockPrisma.usuario.findUnique.mockResolvedValue(mockUser);

    // Act
    await authMiddleware(req as Request, res as Response, next);

    // Assert
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalledWith();
  });
});
