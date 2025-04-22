import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockPrisma } from './setup';
import { AuthService } from '../services/authService';
import { AppError } from '../utils/AppError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrisma)
}));

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('cadastrar', () => {
    const dadosCadastro = {
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: 'Senha123!',
      tipoUsuario: 'cliente' as const
    };

    const usuarioMock = {
      id: 1,
      nome: 'Teste',
      email: 'teste@teste.com',
      tipoUsuario: 'cliente' as const
    };

    it('deve cadastrar um novo usuário com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);
      mockPrisma.usuario.create.mockResolvedValue(usuarioMock);

      const resultado = await AuthService.cadastrar(dadosCadastro);

      expect(resultado).toEqual({
        usuario: usuarioMock,
        token: expect.any(String)
      });
    });

    it('deve falhar ao cadastrar email duplicado', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(usuarioMock);

      await expect(AuthService.cadastrar(dadosCadastro))
        .rejects
        .toThrow(new AppError('Email já cadastrado', 400));
    });
  });

  describe('login', () => {
    const credenciais = {
      email: 'teste@teste.com',
      senha: 'Senha123!'
    };

    const usuarioMock = {
      id: 1,
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: 'hashed_password',
      tipoUsuario: 'cliente' as const
    };

    it('deve fazer login com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(usuarioMock);

      const resultado = await AuthService.login(credenciais);

      expect(resultado).toEqual({
        usuario: {
          id: usuarioMock.id,
          nome: usuarioMock.nome,
          email: usuarioMock.email,
          tipoUsuario: usuarioMock.tipoUsuario
        },
        token: expect.any(String)
      });
    });

    it('deve falhar com credenciais inválidas', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);

      await expect(AuthService.login(credenciais))
        .rejects
        .toThrow(new AppError('Credenciais inválidas', 401));
    });

    it('deve falhar com senha incorreta', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(usuarioMock);
      vi.mocked(bcrypt.compare).mockImplementation(() => Promise.resolve(false));

      await expect(AuthService.login(credenciais))
        .rejects
        .toThrow(new AppError('Credenciais inválidas', 401));
    });
  });

  describe('gerarTokenRecuperacao', () => {
    const email = 'teste@teste.com';
    const usuarioMock = {
      id: 1,
      email: 'teste@teste.com'
    };

    it('deve gerar token de recuperação para email existente', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(usuarioMock);
      mockPrisma.usuario.update.mockResolvedValue({ ...usuarioMock, tokenRecuperacao: 'token' });

      const token = await AuthService.gerarTokenRecuperacao(email);

      expect(token).toBe('mock_recovery_token');
      expect(mockPrisma.usuario.update).toHaveBeenCalledWith({
        where: { email },
        data: { tokenRecuperacao: expect.any(String) }
      });
    });

    it('deve falhar para email não existente', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);

      await expect(AuthService.gerarTokenRecuperacao(email))
        .rejects
        .toThrow(new AppError('Email não encontrado', 404));
    });
  });

  describe('alterarSenha', () => {
    const token = 'token_valido';
    const novaSenha = 'NovaSenha123!';
    const usuarioMock = {
      id: 1,
      email: 'teste@teste.com'
    };

    it('deve alterar senha com sucesso', async () => {
      mockPrisma.usuario.update.mockResolvedValue(usuarioMock);

      const resultado = await AuthService.alterarSenha(token, novaSenha);

      expect(resultado).toBe(true);
      expect(mockPrisma.usuario.update).toHaveBeenCalledWith({
        where: { tokenRecuperacao: token },
        data: {
          senha: expect.any(String),
          tokenRecuperacao: null
        }
      });
    });

    it('deve falhar com token inválido', async () => {
      mockPrisma.usuario.update.mockRejectedValue(new Error('Token inválido'));

      await expect(AuthService.alterarSenha(token, novaSenha))
        .rejects
        .toThrow(new AppError('Token inválido', 400));
    });
  });
}); 
