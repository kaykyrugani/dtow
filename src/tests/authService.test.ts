import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../services/authService';
import { mockPrisma } from './setup';
import { AppError } from '../utils/AppError';

describe('AuthService', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockPrisma.usuario.findUnique.mockReset();
    mockPrisma.usuario.create.mockReset();
  });

  describe('cadastrar', () => {
    it('deve criar um novo usuário com sucesso', async () => {
      const userData = {
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'password123',
        tipoUsuario: 'cliente' as const
      };

      mockPrisma.usuario.findUnique.mockResolvedValueOnce(null);
      mockPrisma.usuario.create.mockResolvedValueOnce({
        id: 1,
        ...userData,
        senha: 'hashed_password123',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const result = await AuthService.cadastrar(userData);

      expect(result).toHaveProperty('usuario');
      expect(result).toHaveProperty('token');
      expect(result.usuario).toHaveProperty('id', 1);
      expect(result.usuario).toHaveProperty('nome', userData.nome);
      expect(result.usuario).toHaveProperty('email', userData.email);
    });

    it('deve lançar erro se o email já estiver em uso', async () => {
      const userData = {
        nome: 'Test User',
        email: 'existing@example.com',
        senha: 'password123',
        tipoUsuario: 'cliente' as const
      };

      mockPrisma.usuario.findUnique.mockResolvedValueOnce({
        id: 1,
        ...userData,
        senha: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await expect(AuthService.cadastrar(userData)).rejects.toThrow(
        new AppError('DUPLICATE_ENTRY', 400)
      );
    });
  });

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      const loginData = {
        email: 'test@example.com',
        senha: 'password123'
      };

      mockPrisma.usuario.findUnique.mockResolvedValueOnce({
        id: 1,
        nome: 'Test User',
        email: loginData.email,
        senha: 'hashed_password123',
        tipoUsuario: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const result = await AuthService.login(loginData);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('usuario');
      expect(result.usuario).toHaveProperty('id', 1);
      expect(result.usuario).toHaveProperty('email', loginData.email);
    });

    it('deve lançar erro se o usuário não existir', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        senha: 'password123'
      };

      mockPrisma.usuario.findUnique.mockResolvedValueOnce(null);

      await expect(AuthService.login(loginData)).rejects.toThrow(
        new AppError('UNAUTHORIZED', 401)
      );
    });

    it('deve lançar erro se a senha estiver incorreta', async () => {
      const loginData = {
        email: 'test@example.com',
        senha: 'wrongpassword'
      };

      mockPrisma.usuario.findUnique.mockResolvedValueOnce({
        id: 1,
        nome: 'Test User',
        email: loginData.email,
        senha: 'hashed_differentpassword',
        tipoUsuario: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await expect(AuthService.login(loginData)).rejects.toThrow(
        new AppError('UNAUTHORIZED', 401)
      );
    });
  });
}); 