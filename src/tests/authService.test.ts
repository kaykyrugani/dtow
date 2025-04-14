import { describe, it, expect, beforeEach, vi } from 'vitest';
import { container } from 'tsyringe';
import { AuthService } from '../services/authService';
import { TokenService } from '../services/TokenService';
import { AppError } from '../utils/AppError';
import { mockPrisma, mockTokenService } from './setup';
import { TipoUsuario } from '../types/usuario';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errorMessages';
import { HttpStatusCode } from '../constants/httpCodes';
import { createTestUser, createTestLoginData, createDuplicateEntryError } from './helpers/testData';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = container.resolve(TokenService);
    authService = container.resolve(AuthService);
    vi.clearAllMocks();
  });

  describe('cadastrar', () => {
    const testUserData = createTestUser();

    it('deve criar um usuário com sucesso', async () => {
      mockPrisma.usuario.create.mockResolvedValue(testUserData);

      const result = await authService.cadastrar(testUserData);

      expect(result).toHaveProperty('usuario');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.usuario).not.toHaveProperty('senha');
      expect(result.usuario.email).toBe(testUserData.email);
    });

    it('deve lançar erro quando email já existe', async () => {
      mockPrisma.usuario.create.mockRejectedValue(
        createDuplicateEntryError('email')
      );

      await expect(authService.cadastrar(testUserData))
        .rejects
        .toThrow(new AppError(ERROR_CODES.DUPLICATE_ENTRY, HttpStatusCode.CONFLICT));
    });

    it('deve lançar erro quando senha é muito curta', async () => {
      const invalidData = { ...testUserData, senha: '123' };

      await expect(authService.cadastrar(invalidData))
        .rejects
        .toThrow(new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST));
    });

    it('deve lançar erro ao tentar cadastrar com tipo de usuário inválido', async () => {
      await expect(authService.cadastrar({
        ...testUserData,
        tipoUsuario: 'invalid' as any
      }))
        .rejects
        .toThrow(new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST));
    });
  });

  describe('login', () => {
    const testLoginData = createTestLoginData();
    const mockUser = createTestUser();

    it('deve fazer login com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(mockUser);

      const result = await authService.login(testLoginData);

      expect(result).toHaveProperty('usuario');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.usuario).not.toHaveProperty('senha');
    });

    it('deve lançar erro quando usuário não existe', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);

      await expect(authService.login(testLoginData))
        .rejects
        .toThrow(new AppError(ERROR_CODES.INVALID_CREDENTIALS, HttpStatusCode.UNAUTHORIZED));
    });

    it('deve lançar erro quando senha está incorreta', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(mockUser);

      await expect(authService.login({
        ...testLoginData,
        senha: 'senha_incorreta'
      }))
        .rejects
        .toThrow(new AppError(ERROR_CODES.INVALID_CREDENTIALS, HttpStatusCode.UNAUTHORIZED));
    });

    it('deve lançar erro quando senha está vazia', async () => {
      await expect(authService.login({
        ...testLoginData,
        senha: ''
      }))
        .rejects
        .toThrow(new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST));
    });

    it('deve lançar erro quando email é inválido', async () => {
      await expect(authService.login({
        ...testLoginData,
        email: 'invalid-email'
      }))
        .rejects
        .toThrow(new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST));
    });
  });

  describe('gerarTokenRecuperacao', () => {
    const testEmail = 'test@example.com';
    const mockUser = createTestUser();

    it('deve gerar token de recuperação com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(mockUser);
      mockTokenService.generatePasswordResetToken.mockResolvedValue('mock_token');

      const result = await authService.gerarTokenRecuperacao(testEmail);

      expect(result).toHaveProperty('token');
      expect(result.token).toBeDefined();
    });

    it('deve retornar mensagem genérica quando email não existe', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);

      const result = await authService.gerarTokenRecuperacao(testEmail);

      expect(result).toEqual({
        mensagem: ERROR_MESSAGES[ERROR_CODES.NOT_FOUND]
      });
    });

    it('deve lançar erro quando email é inválido', async () => {
      await expect(authService.gerarTokenRecuperacao('invalid-email'))
        .rejects
        .toThrow(new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST));
    });
  });

  describe('alterarSenha', () => {
    const testToken = 'valid_token';
    const testNovaSenha = 'NovaSenha123@';

    it('deve alterar senha com sucesso', async () => {
      mockTokenService.verifyPasswordResetToken.mockResolvedValue('user_id');
      mockPrisma.usuario.update.mockResolvedValue(createTestUser());

      const result = await authService.alterarSenha(testToken, testNovaSenha);

      expect(result).toEqual({
        mensagem: ERROR_MESSAGES[ERROR_CODES.PASSWORD_CHANGED]
      });
    });

    it('deve lançar erro quando token é inválido', async () => {
      mockTokenService.verifyPasswordResetToken.mockResolvedValue(null);

      await expect(authService.alterarSenha(testToken, testNovaSenha))
        .rejects
        .toThrow(new AppError(ERROR_CODES.TOKEN_INVALID, HttpStatusCode.BAD_REQUEST));
    });

    it('deve lançar erro quando token está expirado', async () => {
      mockTokenService.verifyPasswordResetToken.mockRejectedValue(
        new AppError(ERROR_CODES.TOKEN_EXPIRED, HttpStatusCode.BAD_REQUEST)
      );

      await expect(authService.alterarSenha(testToken, testNovaSenha))
        .rejects
        .toThrow(new AppError(ERROR_CODES.TOKEN_EXPIRED, HttpStatusCode.BAD_REQUEST));
    });

    it('deve lançar erro quando senha é muito curta', async () => {
      await expect(authService.alterarSenha(testToken, '123'))
        .rejects
        .toThrow(new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST));
    });
  });
}); 