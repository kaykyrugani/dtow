import { describe, it, vi, beforeEach, expect, Mock } from 'vitest';
import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { AuthController } from '../../controllers/authController';
import { AuthService } from '../../services/authService';
import { createTestUser, createTestLoginData } from '../factories/userFactory';
import { AppError } from '../../utils/AppError';
import { Prisma } from '@prisma/client';

describe('AuthController', () => {
  let authService: AuthService;
  let req: Request;
  let res: Response;
  let next: Mock;

  beforeEach(() => {
    authService = {
      cadastrar: vi.fn(),
      login: vi.fn(),
      gerarTokenRecuperacao: vi.fn(),
      alterarSenha: vi.fn(),
    } as unknown as AuthService;

    container.registerInstance('AuthService', authService);

    req = {
      body: {},
    } as Request;

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    next = vi.fn();
  });

  describe('cadastrar', () => {
    it('deve cadastrar um novo usuário com sucesso', async () => {
      const testUser = createTestUser();
      req.body = testUser;
      const expectedResponse = {
        usuario: testUser as Prisma.Usuario,
        accessToken: 'token_jwt',
        refreshToken: 'refresh_token',
      };
      vi.spyOn(authService, 'cadastrar').mockResolvedValue(expectedResponse);

      await AuthController.cadastrar(req, res, next);

      expect(authService.cadastrar).toHaveBeenCalledWith(testUser);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    it('deve chamar next com erro se o cadastro falhar', async () => {
      const error = new AppError('Erro ao cadastrar usuário', 400);
      vi.spyOn(authService, 'cadastrar').mockRejectedValue(error);

      await AuthController.cadastrar(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      const loginData = createTestLoginData();
      const expectedResponse = {
        usuario: createTestUser() as Prisma.Usuario,
        accessToken: 'token_jwt',
        refreshToken: 'refresh_token',
      };
      req.body = loginData;
      vi.spyOn(authService, 'login').mockResolvedValue(expectedResponse);

      await AuthController.login(req, res, next);

      expect(authService.login).toHaveBeenCalledWith(loginData);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    it('deve chamar next com erro se o login falhar', async () => {
      const error = new AppError('Credenciais inválidas', 401);
      vi.spyOn(authService, 'login').mockRejectedValue(error);

      await AuthController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('recuperarSenha', () => {
    it('deve iniciar o processo de recuperação de senha com sucesso', async () => {
      const email = 'test@example.com';
      req.body = { email };
      const expectedResponse = {
        status: 'ok' as const,
        token: 'token_recuperacao',
      };
      vi.spyOn(authService, 'gerarTokenRecuperacao').mockResolvedValue(expectedResponse);

      await AuthController.recuperarSenha(req, res, next);

      expect(authService.gerarTokenRecuperacao).toHaveBeenCalledWith(email);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Se o email existir, você receberá as instruções de recuperação',
        token: expectedResponse.token,
      });
    });
  });

  describe('alterarSenha', () => {
    it('deve alterar a senha com sucesso', async () => {
      const token = 'token_valido';
      const novaSenha = 'nova_senha_123';
      req.body = { token, novaSenha };
      const expectedResponse = {
        mensagem: 'Senha alterada com sucesso' as const,
      };
      vi.spyOn(authService, 'alterarSenha').mockResolvedValue(expectedResponse);

      await AuthController.alterarSenha(req, res, next);

      expect(authService.alterarSenha).toHaveBeenCalledWith(token, novaSenha);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
