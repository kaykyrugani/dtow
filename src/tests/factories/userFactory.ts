import { TipoUsuario } from '../types';

export interface TestUser {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipoUsuario: TipoUsuario;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createTestUser = (overrides: Partial<TestUser> = {}): TestUser => ({
  id: 1,
  nome: 'Test User',
  email: 'test@example.com',
  senha: 'hashed_password',
  tipoUsuario: TipoUsuario.ADMIN,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
});

export interface TestLoginData {
  email: string;
  senha: string;
}

export const createTestLoginData = (overrides: Partial<TestLoginData> = {}): TestLoginData => ({
  email: 'test@example.com',
  senha: 'senha_valida_123',
  ...overrides
}); 