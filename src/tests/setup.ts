import 'reflect-metadata';
import { beforeAll, afterAll, beforeEach, afterEach, vi } from 'vitest';
import { container } from 'tsyringe';
import { mockPrisma } from './mocks';
import './mocks/auth/bcrypt.mock';
import { AuthService } from '../services/authService';
import { TokenService } from '../services/TokenService';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'vitest-mock-extended';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { prisma } from '../config/database';

// Mock do TokenService
export const tokenServiceMock = {
  generateAccessToken: vi.fn(),
  generateRefreshToken: vi.fn(),
  verifyAccessToken: vi.fn(),
  verifyRefreshToken: vi.fn(),
  generatePasswordResetToken: vi.fn(),
  verifyPasswordResetToken: vi.fn(),
  revokePasswordResetToken: vi.fn(),
  revokeRefreshToken: vi.fn(),
};

// Mock do UsuarioRepository
export const usuarioRepositoryMock = {
  create: vi.fn(),
  findByEmail: vi.fn(),
  findByEmailWithPassword: vi.fn(),
  findById: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  findAll: vi.fn(),
};

beforeAll(() => {
  // Forçar uso do ambiente de teste
  process.env.NODE_ENV = 'test';

  // Limpar e registrar instâncias no container
  container.clearInstances();
  container.registerInstance(PrismaClient, mockPrisma);
  container.registerInstance(TokenService, tokenServiceMock as any);
  container.registerInstance('UsuarioRepository', usuarioRepositoryMock);
  container.register(AuthService, AuthService);
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  container.clearInstances();
  container.registerInstance(PrismaClient, mockPrisma);
  container.registerInstance(TokenService, tokenServiceMock as any);
  container.registerInstance('UsuarioRepository', usuarioRepositoryMock);
  container.register(AuthService, AuthService);
});

afterAll(() => {
  container.dispose();
});

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

// Helpers para testes
export const createMockRequest = (options = {}) => ({
  headers: {},
  body: {},
  params: {},
  query: {},
  ...options,
});

export const createMockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

export const mockNext = vi.fn();
