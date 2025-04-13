import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../services/authService';
import { mockPrisma } from './setup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('cadastrar', () => {
    const dadosCadastro = {
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: 'Senha123!'
    };

    const usuarioMock = {
      id: 1,
      nome: 'Teste',
      email: 'teste@teste.com',
      tipoUsuario: 'cliente',
      senha: 'hashed_Senha123!'
    };

    it('deve cadastrar um novo usuário com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);
      mockPrisma.usuario.create.mockResolvedValue(usuarioMock);

      const resultado = await AuthService.cadastrar(dadosCadastro);

      expect(resultado.usuario).toEqual({
        id: usuarioMock.id,
        nome: usuarioMock.nome,
        email: usuarioMock.email,
        tipoUsuario: usuarioMock.tipoUsuario
      });
      expect(resultado.token).toBeDefined();
      expect(mockPrisma.usuario.create).toHaveBeenCalledTimes(1);
    });

    it('deve falhar ao cadastrar email duplicado', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(usuarioMock);

      await expect(AuthService.cadastrar(dadosCadastro))
        .rejects
        .toThrow(new AppError('Email ou CPF já cadastrado', 400));
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
      senha: 'hashed_Senha123!',
      tipoUsuario: 'cliente'
    };

    it('deve fazer login com sucesso', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(usuarioMock);
      vi.mocked(bcrypt.compare).mockImplementation(() => Promise.resolve(true));

      const resultado = await AuthService.login(credenciais);

      expect(resultado.usuario).toEqual({
        id: usuarioMock.id,
        nome: usuarioMock.nome,
        email: usuarioMock.email,
        tipoUsuario: usuarioMock.tipoUsuario
      });
      expect(resultado.token).toBeDefined();
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

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(mockPrisma.usuario.update).toHaveBeenCalledWith({
        where: { id: usuarioMock.id },
        data: { tokenRecuperacao: expect.any(String) }
      });
    });

    it('deve falhar com email não encontrado', async () => {
      mockPrisma.usuario.findUnique.mockResolvedValue(null);

      await expect(AuthService.gerarTokenRecuperacao(email))
        .rejects
        .toThrow(new AppError('Email não encontrado', 404));
    });
  });

  describe('alterarSenha', () => {
    const token = 'token_valido';
    const novaSenha = 'NovaSenha123!';

    it('deve alterar senha com sucesso', async () => {
      mockPrisma.usuario.update.mockResolvedValue({ id: 1 });

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