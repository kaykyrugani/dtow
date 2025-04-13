import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from '../services/authService';
import { mockPrisma } from './setup';
import { AppError } from '../utils/AppError';
import { createDuplicateEmailError, getMockUser } from './helpers/prismaMocks';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('cadastrar', () => {
    const testUserData = {
      email: 'teste@email.com',
      nome: 'Usuário Teste',
      senha: 'senha123',
      tipoUsuario: 'ADMIN' as const
    };

    it('deve criar um novo usuário com sucesso', async () => {
      const mockCreatedUser = getMockUser(testUserData);
      mockPrisma.usuario.create.mockResolvedValueOnce(mockCreatedUser);

      const result = await AuthService.cadastrar(testUserData);

      expect(result).toMatchObject({
        id: expect.any(Number),
        email: testUserData.email,
        nome: testUserData.nome,
        tipoUsuario: testUserData.tipoUsuario
      });
    });

    it('deve lançar erro ao tentar cadastrar com email já existente', async () => {
      mockPrisma.usuario.create.mockRejectedValueOnce(createDuplicateEmailError());

      await expect(AuthService.cadastrar(testUserData))
        .rejects
        .toThrow(new AppError('DUPLICATE_ENTRY', 400));
    });

    it('deve lançar erro ao tentar cadastrar com senha muito curta', async () => {
      await expect(AuthService.cadastrar({
        ...testUserData,
        senha: '123'
      })).rejects.toThrow(new AppError('VALIDATION_ERROR', 400));
    });

    it('deve lançar erro ao tentar cadastrar com tipo de usuário inválido', async () => {
      await expect(AuthService.cadastrar({
        ...testUserData,
        tipoUsuario: 'invalid' as any
      })).rejects.toThrow(new AppError('VALIDATION_ERROR', 400));
    });
  });

  describe('login', () => {
    const testLoginData = {
      email: 'teste@email.com',
      senha: 'senha123'
    };

    const mockUser = getMockUser({
      senha: `hashed_${testLoginData.senha}`,
      id: 1
    });

    it('deve fazer login com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValueOnce(mockUser);

      const result = await AuthService.login(testLoginData);

      expect(result).toEqual({
        usuario: {
          id: mockUser.id,
          email: mockUser.email,
          nome: mockUser.nome,
          tipoUsuario: mockUser.tipoUsuario
        },
        token: `mock_token_${mockUser.id}`
      });

      expect(bcrypt.compare).toHaveBeenCalledWith(
        testLoginData.senha,
        mockUser.senha
      );
    });

    it('deve lançar erro quando usuário não existe', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValueOnce(null);

      await expect(AuthService.login(testLoginData))
        .rejects
        .toThrow(new AppError('INVALID_CREDENTIALS', 401));
    });

    it('deve lançar erro quando senha está incorreta', async () => {
      const userWithDifferentPassword = getMockUser({
        senha: 'hashed_outra_senha'
      });
      mockPrisma.usuario.findUnique.mockResolvedValueOnce(userWithDifferentPassword);

      await expect(AuthService.login(testLoginData))
        .rejects
        .toThrow(new AppError('INVALID_CREDENTIALS', 401));
    });

    it('deve lançar erro quando email é inválido', async () => {
      await expect(AuthService.login({
        ...testLoginData,
        email: 'invalid-email'
      })).rejects.toThrow(new AppError('VALIDATION_ERROR', 400));
    });

    it('deve lançar erro quando senha é muito curta', async () => {
      await expect(AuthService.login({
        ...testLoginData,
        senha: '123'
      })).rejects.toThrow(new AppError('VALIDATION_ERROR', 400));
    });
  });
}); 