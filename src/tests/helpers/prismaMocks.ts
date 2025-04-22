import { Prisma, PrismaClient } from '@prisma/client';

export class PrismaClientKnownRequestError extends Error {
  code: string;
  meta?: { target: string[] };
  name: 'PrismaClientKnownRequestError';

  constructor(message: string, code: string, meta?: { target: string[] }) {
    super(message);
    this.code = code;
    this.meta = meta;
    this.name = 'PrismaClientKnownRequestError';
  }
}

export const createDuplicateEmailError = () => {
  return new PrismaClientKnownRequestError(
    'Unique constraint failed on the fields: (`email`)',
    'P2002',
    { target: ['email'] },
  );
};

export const getMockUser = (overrides = {}) => ({
  id: 1,
  email: 'teste@email.com',
  nome: 'Usuário Teste',
  senha: 'hashed_senha',
  tipoUsuario: 'ADMIN' as const,
  ...overrides,
});
