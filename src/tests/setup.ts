import { vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

// Mock do PrismaClient
export const mockPrisma = {
  usuario: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  produto: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  pedido: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  $connect: vi.fn(),
  $disconnect: vi.fn(),
  $transaction: vi.fn(),
} as unknown as PrismaClient;

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrisma),
}));

// Mock do bcrypt
vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn((str) => Promise.resolve(`hashed_${str}`)),
    compare: vi.fn((str, hash) => Promise.resolve(true)),
    genSalt: vi.fn(() => Promise.resolve('salt')),
  },
}));

// Classes de erro do JWT
class TokenExpiredError extends Error {
  name = 'TokenExpiredError';
  constructor() {
    super('jwt expired');
  }
}

class JsonWebTokenError extends Error {
  name = 'JsonWebTokenError';
  constructor() {
    super('invalid token');
  }
}

// Mock do jsonwebtoken
vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn((payload, secret, options) => 'mock_token'),
    verify: vi.fn((token, secret) => {
      if (token === 'expired') throw new TokenExpiredError();
      if (token === 'invalid') throw new JsonWebTokenError();
      return { id: 1, tipoUsuario: 'cliente' };
    }),
  },
  TokenExpiredError,
  JsonWebTokenError,
}));

// Configuração do ambiente de teste
process.env.JWT_SECRET = 'test_secret';
process.env.NODE_ENV = 'test';

// Limpar mocks antes de cada teste
beforeEach(() => {
  vi.clearAllMocks();
});

// Limpar mocks e restaurar ambiente após todos os testes
afterAll(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

export const createMockRequest = (
  data: Partial<Request> = {}
): Request => {
  return {
    body: {},
    query: {},
    params: {},
    headers: {},
    ...data
  } as Request;
};

export const createMockResponse = (): Response => {
  const res: Partial<Response> = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    setHeader: vi.fn().mockReturnThis(),
    getHeader: vi.fn(),
    removeHeader: vi.fn(),
    headersSent: false
  };
  return res as Response;
};

export const mockNext = vi.fn();

export const mockPrismaError = (code: string) => {
  const error = new Error('Prisma Error');
  (error as any).code = code;
  return error;
};

export const mockJwtPayload = {
  userId: 1,
  email: 'test@example.com',
  roles: ['admin']
};

export const mockUser = {
  id: 1,
  nome: 'Test User',
  email: 'test@example.com',
  tipoUsuario: 'admin'
};

// Reseta todos os mocks após cada teste
afterEach(() => {
  vi.clearAllMocks();
}); 