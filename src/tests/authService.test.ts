import { describe, it, expect, beforeEach, vi } from 'vitest';
import { container } from 'tsyringe';
import { AuthService } from '../services/authService';
import { TokenService } from '../services/TokenService';
import { AppError } from '../utils/AppError';
import { tokenServiceMock, usuarioRepositoryMock } from './setup';
import { TipoUsuario } from '../types/usuario';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errorMessages';
import { HttpStatusCode } from '../constants/httpCodes';
import { createTestUser, createTestLoginData, createDuplicateEntryError } from './helpers/testData';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { mockBcrypt } from './mocks/auth/bcrypt.mock';
import { mockPrisma } from './mocks/prisma.mock';

describe('AuthService', () => {
  let authService: AuthService;

  const testUserData = createTestUser();
  const testLoginData = createTestLoginData();

  beforeEach(() => {
    authService = container.resolve(AuthService);
    vi.clearAllMocks();
  });

  describe('cadastrar', () => {
    it('deve criar um usuário com sucesso', async () => {
      usuarioRepositoryMock.create.mockResolvedValue(testUserData);
      mockBcrypt.hash.mockResolvedValue('hashed_password');
      tokenServiceMock.generateAccessToken.mockReturnValue('access_token');
      tokenServiceMock.generateRefreshToken.mockResolvedValue('refresh_token');

      const result = await authService.cadastrar(testUserData);

      expect(result).toBeDefined();
      if (!result) throw new Error('Result should be defined');
      expect(result.usuario).toBeDefined();
      expect(result.accessToken).toBe('access_token');
      expect(result.refreshToken).toBe('refresh_token');
      expect(result.usuario).not.toHaveProperty('senha');
      expect(result.usuario.email).toBe(testUserData.email);
    });

    it('deve lançar erro quando email já existe', async () => {
      usuarioRepositoryMock.create.mockRejectedValue(createDuplicateEntryError('email'));

      await expect(authService.cadastrar(testUserData)).rejects.toThrow(
        new AppError(ERROR_CODES.DUPLICATE_ENTRY, HttpStatusCode.CONFLICT, { field: 'email' }),
      );
    });

    it('deve lançar erro quando senha é muito curta', async () => {
      const userWithShortPassword = {
        ...testUserData,
        senha: '123',
      };

      await expect(authService.cadastrar(userWithShortPassword)).rejects.toThrow(
        new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST, {
          errors: [
            {
              field: 'senha',
              message: ERROR_MESSAGES[ERROR_CODES.PASSWORD_INVALID],
            },
          ],
        }),
      );
    });

    it('deve lançar erro ao tentar cadastrar com tipo de usuário inválido', async () => {
      const userWithInvalidType = {
        ...testUserData,
        tipoUsuario: 'INVALID_TYPE' as TipoUsuario,
      };

      await expect(authService.cadastrar(userWithInvalidType)).rejects.toThrow(
        new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST, {
          errors: [
            {
              field: 'tipoUsuario',
              message: 'Tipo de usuário inválido',
            },
          ],
        }),
      );
    });
  });

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      usuarioRepositoryMock.findByEmailWithPassword.mockResolvedValue(testUserData);
      mockBcrypt.compare.mockResolvedValue(true);
      tokenServiceMock.generateAccessToken.mockReturnValue('access_token');
      tokenServiceMock.generateRefreshToken.mockResolvedValue('refresh_token');

      const result = await authService.login(testLoginData);

      expect(result).toBeDefined();
      if (!result) throw new Error('Result should be defined');
      expect(result.usuario).toBeDefined();
      expect(result.accessToken).toBe('access_token');
      expect(result.refreshToken).toBe('refresh_token');
      expect(result.usuario).not.toHaveProperty('senha');
    });

    it('deve lançar erro quando usuário não existe', async () => {
      usuarioRepositoryMock.findByEmailWithPassword.mockResolvedValue(null);

      await expect(authService.login(testLoginData)).rejects.toThrow(
        new AppError(ERROR_CODES.INVALID_CREDENTIALS, HttpStatusCode.UNAUTHORIZED),
      );
    });

    it('deve lançar erro quando senha está incorreta', async () => {
      usuarioRepositoryMock.findByEmailWithPassword.mockResolvedValue(testUserData);
      mockBcrypt.compare.mockResolvedValue(false);

      await expect(
        authService.login({
          ...testLoginData,
          senha: 'senha_incorreta',
        }),
      ).rejects.toThrow(new AppError(ERROR_CODES.INVALID_CREDENTIALS, HttpStatusCode.UNAUTHORIZED));
    });

    it('deve lançar erro quando senha está vazia', async () => {
      await expect(
        authService.login({
          ...testLoginData,
          senha: '',
        }),
      ).rejects.toThrow(
        new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST, {
          errors: [
            {
              field: 'senha',
              message: 'Senha é obrigatória',
            },
          ],
        }),
      );
    });

    it('deve lançar erro quando email é inválido', async () => {
      await expect(
        authService.login({
          ...testLoginData,
          email: 'invalid-email',
        }),
      ).rejects.toThrow(
        new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST, {
          errors: [
            {
              field: 'email',
              message: ERROR_MESSAGES[ERROR_CODES.INVALID_EMAIL],
            },
          ],
        }),
      );
    });
  });

  describe('gerarTokenRecuperacao', () => {
    const testEmail = 'test@example.com';

    it('deve gerar token de recuperação com sucesso', async () => {
      usuarioRepositoryMock.findByEmail.mockResolvedValue(testUserData);
      tokenServiceMock.generatePasswordResetToken.mockResolvedValue('reset_token');

      const result = await authService.gerarTokenRecuperacao(testEmail);

      expect(result).toBeDefined();
      if (!result) throw new Error('Result should be defined');
      expect(result.token).toBe('reset_token');
    });

    it('deve retornar mensagem genérica quando email não existe', async () => {
      usuarioRepositoryMock.findByEmail.mockResolvedValue(null);

      const result = await authService.gerarTokenRecuperacao(testEmail);

      expect(result).toEqual({
        mensagem: ERROR_MESSAGES[ERROR_CODES.NOT_FOUND],
      });
    });

    it('deve lançar erro quando email é inválido', async () => {
      await expect(authService.gerarTokenRecuperacao('invalid-email')).rejects.toThrow(
        new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST, {
          errors: [
            {
              field: 'email',
              message: ERROR_MESSAGES[ERROR_CODES.INVALID_EMAIL],
            },
          ],
        }),
      );
    });
  });

  describe('alterarSenha', () => {
    const testToken = 'valid_token';
    const testNovaSenha = 'Nova123@';
    const testUserId = '1';

    it('deve alterar senha com sucesso', async () => {
      tokenServiceMock.verifyPasswordResetToken.mockResolvedValue(testUserId);
      mockBcrypt.hash.mockResolvedValue('hashed_password');
      usuarioRepositoryMock.update.mockResolvedValue(testUserData);
      tokenServiceMock.revokePasswordResetToken.mockResolvedValue(undefined);

      const result = await authService.alterarSenha(testToken, testNovaSenha);

      expect(result).toEqual({
        mensagem: 'Senha alterada com sucesso',
      });
      expect(usuarioRepositoryMock.update).toHaveBeenCalledWith(testUserId, {
        senha: 'hashed_password',
      });
      expect(tokenServiceMock.revokePasswordResetToken).toHaveBeenCalledWith(testToken);
    });

    it('deve lançar erro quando token é inválido', async () => {
      tokenServiceMock.verifyPasswordResetToken.mockResolvedValue(null);

      await expect(authService.alterarSenha(testToken, testNovaSenha)).rejects.toThrow(
        new AppError(ERROR_CODES.TOKEN_INVALID, HttpStatusCode.UNAUTHORIZED),
      );
    });

    it('deve lançar erro quando token está expirado', async () => {
      tokenServiceMock.verifyPasswordResetToken.mockRejectedValue(
        new AppError(ERROR_CODES.TOKEN_EXPIRED, HttpStatusCode.BAD_REQUEST),
      );

      await expect(authService.alterarSenha(testToken, testNovaSenha)).rejects.toThrow(
        new AppError(ERROR_CODES.TOKEN_EXPIRED, HttpStatusCode.BAD_REQUEST),
      );
    });

    it('deve lançar erro quando senha é muito curta', async () => {
      await expect(authService.alterarSenha(testToken, '123')).rejects.toThrow(
        new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST, {
          errors: [
            {
              field: 'novaSenha',
              message: ERROR_MESSAGES[ERROR_CODES.PASSWORD_INVALID],
            },
          ],
        }),
      );
    });
  });
});
