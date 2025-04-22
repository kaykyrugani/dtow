import { PrismaClient } from '@prisma/client';
import { MockProxy } from 'vitest-mock-extended';

export enum TipoUsuario {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE',
}

export type MockPrisma = MockProxy<PrismaClient>;

export interface TestUser {
  id: number;
  email: string;
  senha: string;
  nome: string;
  cpf: string;
  tipoUsuario: TipoUsuario;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestLoginData {
  email: string;
  senha: string;
}
