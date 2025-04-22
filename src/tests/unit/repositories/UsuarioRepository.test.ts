import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { UsuarioRepository } from '../../../repositories/UsuarioRepository';
import { createPrismaError } from '../../../utils/testHelpers';
import { AppError } from '../../../utils/AppError';
import { ERROR_CODES } from '../../../constants/errorMessages';

describe('UsuarioRepository', () => {
  let repository: UsuarioRepository;
  let prismaMock: any;

  beforeEach(() => {
    prismaMock = {
      usuario: {
        findUnique: vi.fn(),
      },
    };
    repository = new UsuarioRepository(prismaMock as unknown as PrismaClient);
  });

  describe('findByEmail', () => {
    it('deve encontrar um usuário por email com sucesso', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        nome: 'Test User',
        senha: 'hashedPassword',
        tipoUsuario: 'ADMIN' as const,
      };

      prismaMock.usuario.findUnique.mockResolvedValue(mockUser);

      const result = await repository.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(prismaMock.usuario.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('deve retornar null quando usuário não existe', async () => {
      prismaMock.usuario.findUnique.mockResolvedValue(null);

      const result = await repository.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });

    it('deve lançar AppError quando ocorre erro no Prisma', async () => {
      prismaMock.usuario.findUnique.mockRejectedValue(
        createPrismaError('P2002', { target: ['email'] }),
      );

      await expect(repository.findByEmail('test@example.com')).rejects.toThrow(
        new AppError(ERROR_CODES.DUPLICATE_ENTRY, 409, { field: 'email' }),
      );
    });
  });

  describe('findByEmailWithPassword', () => {
    it('deve encontrar um usuário com senha por email com sucesso', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        nome: 'Test User',
        senha: 'hashedPassword',
        tipoUsuario: 'ADMIN' as const,
      };

      prismaMock.usuario.findUnique.mockResolvedValue(mockUser);

      const result = await repository.findByEmailWithPassword('test@example.com');

      expect(result).toEqual(mockUser);
      expect(prismaMock.usuario.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        select: {
          id: true,
          email: true,
          nome: true,
          senha: true,
          tipoUsuario: true,
        },
      });
    });

    it('deve retornar null quando usuário não existe', async () => {
      prismaMock.usuario.findUnique.mockResolvedValue(null);

      const result = await repository.findByEmailWithPassword('nonexistent@example.com');

      expect(result).toBeNull();
    });

    it('deve lançar AppError quando ocorre erro no Prisma', async () => {
      prismaMock.usuario.findUnique.mockRejectedValue(
        createPrismaError('P2002', { target: ['email'] }),
      );

      await expect(repository.findByEmailWithPassword('test@example.com')).rejects.toThrow(
        new AppError(ERROR_CODES.DUPLICATE_ENTRY, 409, { field: 'email' }),
      );
    });
  });
});
