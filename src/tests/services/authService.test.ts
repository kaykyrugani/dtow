import { describe, it, expect, beforeEach, vi } from 'vitest';
import { container } from 'tsyringe';
import { AuthService } from '../../services/authService';
import { TokenService } from '../../services/TokenService';
import { AppError } from '../../utils/AppError';
import { mockPrisma } from '../mocks/prisma.mock';
import { createTestUser, createTestLoginData } from '../factories/userFactory';
import { TipoUsuario } from '../types';
import { ERROR_CODES } from '../../constants/errorMessages';
import { expectAppError, expectSuccess } from '../helpers/assertions';
import type { Prisma } from '@prisma/client';
import type { MockPrismaClient } from '../mocks/prisma.mock';

type TokenSuccess = {
  status: 'ok';
  token: string;
};

type TokenInfo = {
  status: 'info';
  mensagem: string;
};

type GerarTokenRecuperacaoResult = TokenSuccess | TokenInfo;

interface IUsuarioResponse {
  usuario: {
    id: string;
    email: string;
    nome: string;
    tipoUsuario: TipoUsuario;
  };
  accessToken: string;
  refreshToken: string;
}

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let usuarioRepositoryMock: MockPrismaClient['usuario'];

  beforeEach(() => {
    tokenService = container.resolve(TokenService);
    authService = container.resolve(AuthService);
    usuarioRepositoryMock = mockPrisma.usuario;
    vi.clearAllMocks();
  });

  describe('cadastrar', () => {
    const testUserData = {
      email: 'test@example.com',
      senha: 'senha_valida_123',
      nome: 'Test User',
      cpf: '12345678901',
      tipoUsuario: TipoUsuario.ADMIN,
    };

    it('deve criar um usuário com sucesso', async () => {
      const mockCreatedUser = createTestUser();
      mockPrisma.usuario.create.mockResolvedValue(mockCreatedUser);

      const result = (await authService.cadastrar(testUserData)) as IUsuarioResponse;
      expect(result).toBeDefined();
      expect(result.usuario).toBeDefined();
      expect(result.usuario.email).toBe(testUserData.email);
    });

    it('deve lançar erro quando email já existe', async () => {
      mockPrisma.usuario.create.mockRejectedValue({
        code: ERROR_CODES.DUPLICATE_ENTRY,
        meta: { target: ['email'] },
      });

      await expectAppError(authService.cadastrar(testUserData), 'DUPLICATE_ENTRY', 409);
    });

    it('deve lançar erro quando senha é muito curta', async () => {
      const invalidData = { ...testUserData, senha: '123' };

      await expectAppError(authService.cadastrar(invalidData), 'VALIDATION_ERROR', 400);
    });

    it('deve lançar erro ao tentar cadastrar com tipo de usuário inválido', async () => {
      await expectAppError(
        authService.cadastrar({
          ...testUserData,
          tipoUsuario: 'invalid' as any,
        }),
        'VALIDATION_ERROR',
        400,
      );
    });
  });

  describe('login', () => {
    const testLoginData = createTestLoginData();
    const mockUser = createTestUser();

    it('deve fazer login com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(mockUser);

      const result = (await authService.login(testLoginData)) as Required<IUsuarioResponse>;

      expect(result).toBeDefined();
      expect(result.usuario).toBeDefined();
      expect(result.usuario.email).toBe(testLoginData.email);
    });

    it('deve lançar erro quando usuário não existe', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);

      await expectAppError(authService.login(testLoginData), 'INVALID_CREDENTIALS', 401);
    });

    it('deve lançar erro quando senha está incorreta', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(mockUser);

      await expectAppError(
        authService.login({
          ...testLoginData,
          senha: 'senha_incorreta',
        }),
        'INVALID_CREDENTIALS',
        401,
      );
    });

    it('deve lançar erro quando senha está vazia', async () => {
      await expectAppError(
        authService.login({
          ...testLoginData,
          senha: '',
        }),
        'VALIDATION_ERROR',
        400,
      );
    });

    it('deve lançar erro quando email é inválido', async () => {
      await expectAppError(
        authService.login({
          ...testLoginData,
          email: 'invalid-email',
        }),
        'VALIDATION_ERROR',
        400,
      );
    });
  });

  describe('gerarTokenRecuperacao', () => {
    const testEmail = 'teste@email.com';
    const mockUser = createTestUser({ email: testEmail });

    it('deve gerar token de recuperação com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(mockUser);
      mockPrisma.passwordResetToken.create.mockResolvedValue({
        id: 1,
        token: 'mock_token',
        userId: mockUser.id,
        expiresAt: new Date(),
        used: false,
      });

      const result = await authService.gerarTokenRecuperacao(testEmail);

      expect(result).toBeDefined();
      expect(result.status).toBe('ok');
      if (result.status === 'ok') {
        expect(result.token).toBeDefined();
      }
    });

    it('deve retornar mensagem genérica quando email não existe', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);

      const result = await authService.gerarTokenRecuperacao(testEmail);

      expect(result).toBeDefined();
      expect(result.status).toBe('info');
      if (result.status === 'info') {
        expect(result.mensagem).toBe(
          'Se o email existir, você receberá as instruções de recuperação',
        );
      }
    });

    it('deve lançar erro quando email é inválido', async () => {
      await expectAppError(
        authService.gerarTokenRecuperacao('invalid-email'),
        'VALIDATION_ERROR',
        400,
      );
    });
  });

  describe('alterarSenha', () => {
    const testToken = 'valid_token';
    const testNovaSenha = 'NovaSenha123@';
    const mockUser = createTestUser();

    it('deve alterar senha com sucesso', async () => {
      mockPrisma.passwordResetToken.findFirst.mockResolvedValue({
        id: 1,
        token: testToken,
        userId: mockUser.id,
        expiresAt: new Date(Date.now() + 3600000),
        used: false,
      });

      mockPrisma.usuario.update.mockResolvedValue(mockUser);

      const result = await authService.alterarSenha(testToken, testNovaSenha);

      expect(result).toEqual({ mensagem: 'Senha alterada com sucesso' });
    });

    it('deve lançar erro quando token é inválido', async () => {
      mockPrisma.passwordResetToken.findFirst.mockResolvedValue(null);

      await expectAppError(
        authService.alterarSenha(testToken, testNovaSenha),
        'TOKEN_INVALID',
        400,
      );
    });

    it('deve lançar erro quando token está expirado', async () => {
      mockPrisma.passwordResetToken.findFirst.mockResolvedValue({
        id: 1,
        token: testToken,
        userId: mockUser.id,
        expiresAt: new Date(Date.now() - 3600000),
        used: false,
      });

      await expectAppError(
        authService.alterarSenha(testToken, testNovaSenha),
        'TOKEN_EXPIRED',
        400,
      );
    });

    it('deve lançar erro quando senha é muito curta', async () => {
      await expectAppError(authService.alterarSenha(testToken, '123'), 'VALIDATION_ERROR', 400);
    });
  });
});
