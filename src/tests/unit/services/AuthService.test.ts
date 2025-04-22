import { describe, it, expect, beforeEach, vi } from 'vitest';
import { container } from 'tsyringe';
import { AuthService } from '../../../services/AuthService';
import { UsuarioRepository } from '../../../repositories/UsuarioRepository';
import { AppError } from '../../../utils/AppError';
import { mockDeep } from 'vitest-mock-extended';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed_password'),
    compare: vi.fn().mockResolvedValue(true),
  },
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn().mockReturnValue('fake_token'),
  },
}));

describe('AuthService', () => {
  let authService: AuthService;
  let usuarioRepositoryMock: any;

  beforeEach(() => {
    usuarioRepositoryMock = mockDeep<UsuarioRepository>();
    container.registerInstance('UsuarioRepository', usuarioRepositoryMock);
    authService = container.resolve(AuthService);
  });

  describe('cadastrar', () => {
    const dadosRegistro = {
      nome: 'Teste',
      email: 'teste@email.com',
      senha: 'Senha123',
      tipoUsuario: 'USER' as const,
    };

    it('deve cadastrar um novo usuário com sucesso', async () => {
      const usuarioMock = {
        id: 1,
        nome: dadosRegistro.nome,
        email: dadosRegistro.email,
        tipoUsuario: dadosRegistro.tipoUsuario,
      };

      usuarioRepositoryMock.create.mockResolvedValue(usuarioMock);

      const result = await authService.cadastrar(dadosRegistro);

      expect(result).toEqual(usuarioMock);
      expect(bcrypt.hash).toHaveBeenCalledWith(dadosRegistro.senha, 12);
    });

    it('deve lançar erro quando dados são inválidos', async () => {
      const dadosInvalidos = {
        ...dadosRegistro,
        email: 'email_invalido',
      };

      await expect(authService.cadastrar(dadosInvalidos)).rejects.toThrow(AppError);
    });

    it('deve lançar erro quando email já existe', async () => {
      usuarioRepositoryMock.create.mockRejectedValue(new AppError('EMAIL_DUPLICATED', 409));

      await expect(authService.cadastrar(dadosRegistro)).rejects.toThrow(AppError);
    });
  });

  describe('login', () => {
    const dadosLogin = {
      email: 'teste@email.com',
      senha: 'Senha123',
    };

    const usuarioMock = {
      id: 1,
      nome: 'Teste',
      email: dadosLogin.email,
      senha: 'hashed_password',
      tipoUsuario: 'USER',
    };

    it('deve fazer login com sucesso', async () => {
      usuarioRepositoryMock.findByEmailWithPassword.mockResolvedValue(usuarioMock);

      const result = await authService.login(dadosLogin);

      expect(result).toEqual({
        usuario: {
          id: usuarioMock.id,
          nome: usuarioMock.nome,
          email: usuarioMock.email,
          tipoUsuario: usuarioMock.tipoUsuario,
        },
        token: 'fake_token',
      });
    });

    it('deve lançar erro quando email não existe', async () => {
      usuarioRepositoryMock.findByEmailWithPassword.mockResolvedValue(null);

      await expect(authService.login(dadosLogin)).rejects.toThrow(AppError);
    });

    it('deve lançar erro quando senha está incorreta', async () => {
      usuarioRepositoryMock.findByEmailWithPassword.mockResolvedValue(usuarioMock);
      vi.mocked(bcrypt.compare).mockResolvedValueOnce(false);

      await expect(authService.login(dadosLogin)).rejects.toThrow(AppError);
    });
  });
});
