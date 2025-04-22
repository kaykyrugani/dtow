import { TipoUsuario, Usuario } from '../types/usuario';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const createTestUser = (overrides: Partial<Usuario> = {}): Usuario => ({
  id: '1',
  email: 'test@example.com',
  senha: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LcdYShXvgUwh6SyXy', // senha_valida_123
  nome: 'Test User',
  cpf: '12345678901',
  tipoUsuario: TipoUsuario.ADMIN,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export interface LoginData {
  email: string;
  senha: string;
}

export const createTestLoginData = (overrides: Partial<LoginData> = {}): LoginData => ({
  email: 'test@example.com',
  senha: 'senha_valida_123',
  ...overrides,
});

export const createPrismaError = (
  code: string,
  message = 'Prisma error',
  meta?: Record<string, any>,
): PrismaClientKnownRequestError => {
  const error = new PrismaClientKnownRequestError(message, {
    code,
    clientVersion: '4.x.x',
    meta,
  });
  return error;
};

export const createJwtError = (message: string): Error => {
  const error = new Error(message);
  error.name = 'JsonWebTokenError';
  return error;
};

export const createTokenExpiredError = (): Error => {
  const error = new Error('Token expired');
  error.name = 'TokenExpiredError';
  return error;
};
