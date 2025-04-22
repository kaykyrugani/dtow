import { vi } from 'vitest';

export class MockTokenExpiredError extends Error {
  constructor() {
    super('jwt expired');
    this.name = 'TokenExpiredError';
  }
}

export class MockJsonWebTokenError extends Error {
  constructor() {
    super('invalid token');
    this.name = 'JsonWebTokenError';
  }
}

export const mockJWT = {
  verify: vi.fn((token: string) => {
    if (token === 'expired') {
      throw new MockTokenExpiredError();
    }
    if (token === 'invalid') {
      throw new MockJsonWebTokenError();
    }
    return {
      id: 1,
      nome: 'Test User',
      email: 'test@example.com',
      tipoUsuario: 'cliente',
    };
  }),
  sign: vi.fn(() => 'valid.test.token'),
  TokenExpiredError: MockTokenExpiredError,
  JsonWebTokenError: MockJsonWebTokenError,
};
