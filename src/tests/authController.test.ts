import { describe, beforeEach, test, expect, vi } from 'vitest';
import { AuthController } from '../controllers/authController';
import { AuthService } from '../services/authService';
import { ZodError } from 'zod';

// Mock do AuthService
vi.mock('../services/authService', () => ({
  AuthService: {
    cadastrar: vi.fn(),
    login: vi.fn(),
    gerarTokenRecuperacao: vi.fn(),
    alterarSenha: vi.fn()
  }
}));

describe('AuthController', () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockReq = {
      body: {}
    };

    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
  });

  describe('cadastrar', () => {
    test('deve cadastrar usuário com sucesso', async () => {
      const dadosCadastro = {
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'Senha@123'
      };
      mockReq.body = dadosCadastro;

      const mockResultado = {
        usuario: { id: 1, ...dadosCadastro },
        token: 'token_mock'
      };
      vi.mocked(AuthService.cadastrar).mockResolvedValue(mockResultado);

      await AuthController.cadastrar(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockResultado);
    });

    test('deve retornar erro 400 para dados inválidos', async () => {
      const zodError = new ZodError([
        { code: 'invalid_type', path: ['email'], message: 'Email inválido' }
      ]);
      vi.mocked(AuthService.cadastrar).mockRejectedValue(zodError);

      await AuthController.cadastrar(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        erro: 'Dados inválidos',
        detalhes: zodError.errors
      });
    });
  });

  describe('login', () => {
    test('deve fazer login com sucesso', async () => {
      const credenciais = {
        email: 'joao@example.com',
        senha: 'Senha@123'
      };
      mockReq.body = credenciais;

      const mockResultado = {
        usuario: { id: 1, email: credenciais.email },
        token: 'token_mock'
      };
      vi.mocked(AuthService.login).mockResolvedValue(mockResultado);

      await AuthController.login(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockResultado);
    });

    test('deve retornar erro 400 para credenciais inválidas', async () => {
      vi.mocked(AuthService.login).mockRejectedValue(new Error('Credenciais inválidas'));

      await AuthController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        erro: 'Credenciais inválidas'
      });
    });
  });

  describe('recuperarSenha', () => {
    test('deve gerar token de recuperação com sucesso', async () => {
      const email = 'joao@example.com';
      mockReq.body = { email };

      const mockToken = 'token_recuperacao';
      vi.mocked(AuthService.gerarTokenRecuperacao).mockResolvedValue(mockToken);

      await AuthController.recuperarSenha(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        mensagem: 'Se o email existir, você receberá as instruções de recuperação',
        token: mockToken
      });
    });

    test('deve retornar mensagem padrão mesmo para email não existente', async () => {
      mockReq.body = { email: 'naoexiste@example.com' };
      vi.mocked(AuthService.gerarTokenRecuperacao).mockResolvedValue(undefined);

      await AuthController.recuperarSenha(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        mensagem: 'Se o email existir, você receberá as instruções de recuperação',
        token: undefined
      });
    });
  });

  describe('alterarSenha', () => {
    test('deve alterar senha com sucesso', async () => {
      const dados = {
        token: 'token_valido',
        novaSenha: 'NovaSenha@123'
      };
      mockReq.body = dados;

      vi.mocked(AuthService.alterarSenha).mockResolvedValue(true);

      await AuthController.alterarSenha(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        mensagem: 'Senha alterada com sucesso'
      });
    });

    test('deve retornar erro 400 para token inválido', async () => {
      mockReq.body = {
        token: 'token_invalido',
        novaSenha: 'NovaSenha@123'
      };

      vi.mocked(AuthService.alterarSenha).mockRejectedValue(new Error('Token inválido'));

      await AuthController.alterarSenha(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        erro: 'Token inválido'
      });
    });
  });
}); 