import 'reflect-metadata';
import { beforeAll, afterAll, beforeEach, afterEach, vi } from 'vitest';
import { container } from 'tsyringe';
import { mockPrisma, createMockTokenService } from './mocks';
import './mocks/auth/bcrypt.mock';
import { AuthService } from '../services/authService';
import { TokenService } from '../services/TokenService';
import { PrismaClient } from '@prisma/client';
import { setupTestContainer, clearDatabase, closeTestConnection } from '../config/test';

const mockTokenService = createMockTokenService();

let prisma: PrismaClient;

beforeAll(async () => {
  const setup = await setupTestContainer();
  prisma = setup.prisma;
  container.clearInstances();
  container.registerInstance('PrismaClient', mockPrisma);
  container.registerInstance(TokenService, mockTokenService);
  container.register(AuthService, AuthService);
});

beforeEach(async () => {
  vi.clearAllMocks();
  await clearDatabase(prisma);
  container.clearInstances();
  container.registerInstance('PrismaClient', mockPrisma);
  container.registerInstance(TokenService, mockTokenService);
  container.register(AuthService, AuthService);
});

afterEach(() => {
  container.clearInstances();
});

afterAll(async () => {
  await closeTestConnection(prisma);
  container.dispose();
});

export { mockTokenService }; 