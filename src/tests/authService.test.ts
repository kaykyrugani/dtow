import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from '../services/authService';
import { mockPrisma, createPrismaError } from './setup';
import { AppError } from '../utils/AppError';
import { createDuplicateEmailError, getMockUser } from './helpers/prismaMocks';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../constants/httpCodes';

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
      const mockCreatedUser = {
        id: 1,
        ...testUserData,
        senha: `hashed_${testUserData.senha}`
      };
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
      mockPrisma.usuario.create.mockRejectedValueOnce(
        createPrismaError('P2002', { target: ['email'] })
      );

      await expect(AuthService.cadastrar(testUserData))
        .rejects
        .toThrow(new AppError('EMAIL_DUPLICATED', HttpStatusCode.CONFLICT));
    });

    it('deve lançar erro ao tentar cadastrar com senha muito curta', async () => {
      await expect(AuthService.cadastrar({
        ...testUserData,
        senha: '123'
      })).rejects.toThrow(new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST));
    });

    it('deve lançar erro ao tentar cadastrar com tipo de usuário inválido', async () => {
      await expect(AuthService.cadastrar({
        ...testUserData,
        tipoUsuario: 'invalid' as any
      })).rejects.toThrow(new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST));
    });
  });

  describe('login', () => {
    const testLoginData = {
      email: 'teste@email.com',
      senha: 'senha123'
    };

    const mockUser = {
      id: 1,
      email: testLoginData.email,
      nome: 'Usuário Teste',
      senha: `hashed_${testLoginData.senha}`,
      tipoUsuario: 'ADMIN' as const
    };

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
        .toThrow(new AppError('INVALID_CREDENTIALS', HttpStatusCode.UNAUTHORIZED));
    });

    it('deve lançar erro quando senha está incorreta', async () => {
      const userWithDifferentPassword = {
        ...mockUser,
        senha: 'hashed_outra_senha'
      };
      mockPrisma.usuario.findUnique.mockResolvedValueOnce(userWithDifferentPassword);

      await expect(AuthService.login(testLoginData))
        .rejects
        .toThrow(new AppError('INVALID_CREDENTIALS', HttpStatusCode.UNAUTHORIZED));
    });

    it('deve lançar erro quando email é inválido', async () => {
      await expect(AuthService.login({
        ...testLoginData,
        email: 'invalid-email'
      })).rejects.toThrow(new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST));
    });

    it('deve lançar erro quando senha é muito curta', async () => {
      await expect(AuthService.login({
        ...testLoginData,
        senha: '123'
      })).rejects.toThrow(new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST));
    });
  });
}); 