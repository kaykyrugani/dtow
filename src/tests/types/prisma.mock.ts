import { jest } from '@jest/globals';

export interface Usuario {
  id?: number;
  nome?: string;
  email?: string;
  cpf?: string;
  senha?: string;
  tipoUsuario?: 'cliente' | 'admin';
  criadoEm?: Date;
}

export interface PrismaMock {
  usuario: {
    create: jest.Mock<Promise<Usuario>, [data: { data: Partial<Usuario> }]>;
    findFirst: jest.Mock<Promise<Usuario | null>, [params?: { where: any }]>;
    findUnique: jest.Mock<Promise<Usuario | null>, [params?: { where: any }]>;
    update: jest.Mock<Promise<Usuario>, [params: { where: any; data: Partial<Usuario> }]>;
  };
} 