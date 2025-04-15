import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../errors/AppError';

vi.mock('@prisma/client');

describe('ensureAuthenticated', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let prisma: PrismaClient;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    mockNext = vi.fn();
    prisma = container.resolve(PrismaClient);
  });

  it('deve lançar erro quando não fornecer token', async () => {
    mockRequest.headers = {};

    await expect(
      ensureAuthenticated(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      )
    ).rejects.toThrow(new AppError('Token não fornecido', 401));
  });

  it('deve lançar erro quando token for inválido', async () => {
    mockRequest.headers = {
      authorization: 'Bearer invalid-token'
    };

    vi.spyOn(prisma.refreshToken, 'findUnique').mockResolvedValue(null);

    await expect(
      ensureAuthenticated(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      )
    ).rejects.toThrow(new AppError('Token inválido', 401));
  });

  it('deve lançar erro quando token estiver expirado', async () => {
    mockRequest.headers = {
      authorization: 'Bearer expired-token'
    };

    vi.spyOn(prisma.refreshToken, 'findUnique').mockResolvedValue({
      id: 1,
      token: 'expired-token',
      expiresAt: new Date(Date.now() - 1000),
      userId: 1,
      usuario: {
        id: 1,
        tipoUsuario: 'CLIENTE'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    } as any);

    await expect(
      ensureAuthenticated(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      )
    ).rejects.toThrow(new AppError('Token expirado', 401));
  });

  it('deve adicionar usuário na requisição e chamar next quando token for válido', async () => {
    mockRequest.headers = {
      authorization: 'Bearer valid-token'
    };

    vi.spyOn(prisma.refreshToken, 'findUnique').mockResolvedValue({
      id: 1,
      token: 'valid-token',
      expiresAt: new Date(Date.now() + 1000),
      userId: 1,
      usuario: {
        id: 1,
        tipoUsuario: 'CLIENTE'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    } as any);

    await ensureAuthenticated(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockRequest.user).toEqual({
      id: 1,
      tipo: 'CLIENTE'
    });
    expect(mockNext).toHaveBeenCalled();
  });
}); 