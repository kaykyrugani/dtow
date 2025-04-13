import { vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { HttpStatusCode } from '../constants/httpCodes';

// Enum para Status HTTP
export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

// Mock do PrismaClient
export const mockPrisma = {
  usuario: {
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
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

// Helper para criar erros do Prisma
export const createPrismaError = (code: string, meta?: Record<string, any>) => {
  const error = new Error('Prisma Error');
  Object.setPrototypeOf(error, PrismaClientKnownRequestError.prototype);
  Object.assign(error, {
    code,
    meta,
    name: 'PrismaClientKnownRequestError',
    message: `Prisma error with code ${code}`
  });
  return error as PrismaClientKnownRequestError;
};

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => mockPrisma)
}));

// Mock do bcrypt
vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockImplementation((senha) => Promise.resolve(`hashed_${senha}`)),
    compare: vi.fn().mockImplementation((senha, hash) => {
      return Promise.resolve(hash === `hashed_${senha}`);
    })
  }
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
    sign: vi.fn().mockImplementation((payload) => `mock_token_${payload.userId}`),
    verify: vi.fn().mockImplementation((token) => {
      const userId = token.split('_').pop();
      return { userId: Number(userId) };
    })
  }
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