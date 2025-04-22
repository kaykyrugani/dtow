import { mockDeep } from 'vitest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { TestUser, TipoUsuario, TestLoginData } from '../types';

export const createMockPrisma = () => mockDeep<PrismaClient>();

export const createTestUser = (overrides: Partial<TestUser> = {}): TestUser => ({
  id: 1,
  email: 'test@example.com',
  senha: '$2b$10$abcdefghijklmnopqrstuvwxyz',
  nome: 'Test User',
  cpf: '12345678901',
  tipoUsuario: TipoUsuario.ADMIN,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createTestLoginData = (overrides: Partial<TestLoginData> = {}): TestLoginData => ({
  email: 'test@example.com',
  senha: 'senha_correta',
  ...overrides,
});

export { mockPrisma } from './prisma.mock';
export { createMockTokenService } from './auth/tokenService.mock';
export { mockBcrypt } from './auth/bcrypt.mock';
