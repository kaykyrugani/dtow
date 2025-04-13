import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from '../services/authService';
import { mockPrisma, createPrismaError } from './setup';
import { AppError } from '../utils/AppError';
import { createDuplicateEmailError, getMockUser } from './helpers/prismaMocks';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../constants/httpCodes';
import { container } from 'tsyringe';
import { TokenService } from '../services/tokenService';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;

  beforeEach(() => {
    vi.clearAllMocks();
    tokenService = container.resolve(TokenService);
    authService = container.resolve(AuthService);
  });

  describe('cadastrar', () => {
    const testUserData = {
      email: 'teste@email.com',
      nome: 'Usuário Teste',
      senha: 'Senha123@',
      tipoUsuario: 'ADMIN' as const
    };

    it('deve criar um novo usuário com sucesso', async () => {
      const mockCreatedUser = {
        id: 1,
        ...testUserData,
        senha: await bcrypt.hash(testUserData.senha, 12)
      };
      mockPrisma.usuario.create.mockResolvedValueOnce(mockCreatedUser);

      const result = await authService.cadastrar(testUserData);

      expect(result).toMatchObject({
        usuario: {
          id: expect.any(Number),
          email: testUserData.email,
          nome: testUserData.nome,
          tipoUsuario: testUserData.tipoUsuario
        },
        accessToken: expect.any(String),
        refreshToken: expect.any(String)
      });
    });

    it('deve lançar erro ao tentar cadastrar com email já existente', async () => {
      mockPrisma.usuario.create.mockRejectedValueOnce(
        createPrismaError('P2002', { target: ['email'] })
      );

      await expect(authService.cadastrar(testUserData))
        .rejects
        .toThrow(new AppError('INTERNAL_ERROR', HttpStatusCode.INTERNAL_SERVER_ERROR));
    });

    it('deve lançar erro ao tentar cadastrar com senha muito curta', async () => {
      await expect(authService.cadastrar({
        ...testUserData,
        senha: '123'
      })).rejects.toThrow(new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST));
    });

    it('deve lançar erro ao tentar cadastrar com tipo de usuário inválido', async () => {
      await expect(authService.cadastrar({
        ...testUserData,
        tipoUsuario: 'invalid' as any
      })).rejects.toThrow(new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST));
    });
  });

  describe('login', () => {
    const testLoginData = {
      email: 'teste@email.com',
      senha: 'Senha123@'
    };

    const mockUser = {
      id: 1,
      email: testLoginData.email,
      nome: 'Usuário Teste',
      senha: 'hashed_password',
      tipoUsuario: 'ADMIN' as const
    };

    it('deve fazer login com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValueOnce(mockUser);
      vi.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.resolve(true));

      const result = await authService.login(testLoginData);

      expect(result).toMatchObject({
        usuario: {
          id: mockUser.id,
          email: mockUser.email,
          nome: mockUser.nome,
          tipoUsuario: mockUser.tipoUsuario
        },
        accessToken: expect.any(String),
        refreshToken: expect.any(String)
      });
    });

    it('deve lançar erro quando usuário não existe', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValueOnce(null);

      await expect(authService.login(testLoginData))
        .rejects
        .toThrow(new AppError('INVALID_CREDENTIALS', HttpStatusCode.UNAUTHORIZED));
    });

    it('deve lançar erro quando senha está incorreta', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValueOnce(mockUser);
      vi.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.resolve(false));

      await expect(authService.login(testLoginData))
        .rejects
        .toThrow(new AppError('INVALID_CREDENTIALS', HttpStatusCode.UNAUTHORIZED));
    });

    it('deve lançar erro quando email é inválido', async () => {
      await expect(authService.login({
        ...testLoginData,
        email: 'invalid-email'
      })).rejects.toThrow(new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST));
    });
  });

  describe('gerarTokenRecuperacao', () => {
    const testEmail = 'teste@email.com';
    const mockUser = {
      id: 1,
      email: testEmail,
      nome: 'Usuário Teste'
    };

    it('deve gerar token de recuperação com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValueOnce(mockUser);
      mockPrisma.passwordResetToken.create.mockResolvedValueOnce({
        id: 1,
        token: 'mock_token',
        userId: mockUser.id,
        expiresAt: new Date(),
        used: false
      });

      const result = await authService.gerarTokenRecuperacao(testEmail);

      expect(result).toHaveProperty('token');
      expect(result.token).toBeDefined();
    });

    it('deve retornar mensagem genérica quando email não existe', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValueOnce(null);

      const result = await authService.gerarTokenRecuperacao(testEmail);

      expect(result).toEqual({
        mensagem: 'Se o email existir, você receberá as instruções de recuperação'
      });
    });

    it('deve lançar erro quando email é inválido', async () => {
      await expect(authService.gerarTokenRecuperacao('invalid-email'))
        .rejects
        .toThrow(new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST));
    });
  });

  describe('alterarSenha', () => {
    const testToken = 'valid_token';
    const testNovaSenha = 'NovaSenha123@';
    const mockUserId = 1;

    beforeEach(() => {
      vi.spyOn(jwt, 'verify').mockImplementation(() => ({ userId: mockUserId }));
    });

    it('deve alterar senha com sucesso', async () => {
      mockPrisma.passwordResetToken.findFirst.mockResolvedValueOnce({
        id: 1,
        token: testToken,
        userId: mockUserId,
        expiresAt: new Date(Date.now() + 3600000),
        used: false
      });

      const result = await authService.alterarSenha(testToken, testNovaSenha);

      expect(result).toEqual({ mensagem: 'Senha alterada com sucesso' });
      expect(mockPrisma.usuario.update).toHaveBeenCalled();
      expect(mockPrisma.passwordResetToken.update).toHaveBeenCalled();
    });

    it('deve lançar erro quando token é inválido', async () => {
      mockPrisma.passwordResetToken.findFirst.mockResolvedValueOnce(null);

      await expect(authService.alterarSenha(testToken, testNovaSenha))
        .rejects
        .toThrow(new AppError('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED));
    });

    it('deve lançar erro quando token está expirado', async () => {
      mockPrisma.passwordResetToken.findFirst.mockResolvedValueOnce({
        id: 1,
        token: testToken,
        userId: mockUserId,
        expiresAt: new Date(Date.now() - 3600000),
        used: false
      });

      await expect(authService.alterarSenha(testToken, testNovaSenha))
        .rejects
        .toThrow(new AppError('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED));
    });

    it('deve lançar erro quando senha é muito curta', async () => {
      await expect(authService.alterarSenha(testToken, '123'))
        .rejects
        .toThrow(new AppError('VALIDATION_ERROR', HttpStatusCode.BAD_REQUEST));
    });
  });
}); 