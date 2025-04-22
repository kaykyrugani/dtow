import { users, loginData, tokens } from '../fixtures/users';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from '../../utils/AppError';
import { ERROR_CODES } from '../../constants/errorCodes';
import { HttpStatusCode } from '../../shared/errors/HttpStatusCode';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import type { Usuario, Produto } from '@prisma/client';

export const createTestUser = async (prisma: PrismaClient) => {
  return await prisma.usuario.create({
    data: {
      email: 'test@example.com',
      senha: 'Test@123',
      nome: 'Test User',
      tipoUsuario: 'CLIENTE',
      cpf: '12345678900',
      telefone: '11999999999',
    },
  });
};

export const createTestProduct = async (prisma: PrismaClient) => {
  return await prisma.produto.create({
    data: {
      nome: 'Produto Teste',
      descricao: 'Descrição do produto teste',
      preco: 100.0,
      estoque: 10,
      categoria: 'ELETRONICOS',
      subcategoria: 'SMARTPHONES',
      marca: 'Marca Teste',
      modelo: 'Modelo Teste',
      imagem: 'https://exemplo.com/imagem.jpg',
      imagens: '[]',
      tamanhos: '[]',
      ativo: true,
    },
  });
};

export const createInvalidTestUser = (overrides = {}) => ({
  ...users.invalid,
  ...overrides,
});

export const createTestLoginData = (overrides = {}) => ({
  ...loginData.valid,
  ...overrides,
});

export const createInvalidLoginData = (overrides = {}) => ({
  ...loginData.invalid,
  ...overrides,
});

export const createPrismaError = (
  code: string,
  message = 'Database error',
  meta?: Record<string, unknown>,
): PrismaClientKnownRequestError => {
  return new PrismaClientKnownRequestError(message, {
    code,
    clientVersion: '5.x',
    meta: meta || {},
  });
};

export const generateAuthToken = (user: Usuario) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      tipoUsuario: user.tipoUsuario,
    },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' },
  );
};

export const createDuplicateEntryError = () => {
  return new AppError(
    ERROR_CODES.DUPLICATE_ENTRY.message,
    ERROR_CODES.DUPLICATE_ENTRY.code,
    ERROR_CODES.DUPLICATE_ENTRY.status,
  );
};

export const createNotFoundError = () => {
  return new AppError(
    ERROR_CODES.INTERNAL_ERROR.message,
    ERROR_CODES.INTERNAL_ERROR.code,
    ERROR_CODES.INTERNAL_ERROR.status,
  );
};

export const createValidationError = () => {
  return new AppError(
    ERROR_CODES.VALIDATION_ERROR.message,
    ERROR_CODES.VALIDATION_ERROR.code,
    ERROR_CODES.VALIDATION_ERROR.status,
  );
};

export const createAuthError = () =>
  new AppError(
    ERROR_CODES.INVALID_CREDENTIALS.message,
    ERROR_CODES.INVALID_CREDENTIALS.code,
    ERROR_CODES.INVALID_CREDENTIALS.status,
  );

export const createTokenError = (expired = false) =>
  new AppError(
    expired ? ERROR_CODES.TOKEN_EXPIRED.message : ERROR_CODES.TOKEN_INVALID.message,
    expired ? ERROR_CODES.TOKEN_EXPIRED.code : ERROR_CODES.TOKEN_INVALID.code,
    expired ? ERROR_CODES.TOKEN_EXPIRED.status : ERROR_CODES.TOKEN_INVALID.status,
  );

export const createUnauthorizedError = () => {
  return new AppError('Não autorizado', 'UNAUTHORIZED', 401);
};

export const createForbiddenError = () => {
  return new AppError('Acesso negado', 'FORBIDDEN', 403);
};

export const expectSuccess = (res: any, data?: any) => {
  expect(res.status).toHaveBeenCalledWith(HttpStatusCode.OK);
  if (data) {
    expect(res.json).toHaveBeenCalledWith(data);
  }
};
