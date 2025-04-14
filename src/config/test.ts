import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { TokenService } from '../services/TokenService';
import { AuthService } from '../services/authService';
import { BaseService } from '../services/BaseService';

export async function setupTestContainer() {
  const prisma = new PrismaClient();

  // Registra o cliente Prisma
  container.registerInstance(PrismaClient, prisma);

  // Registra os repositórios
  container.registerSingleton('UsuarioRepository', UsuarioRepository);

  // Registra os serviços
  container.registerSingleton('TokenService', TokenService);
  container.registerSingleton('AuthService', AuthService);
  container.registerSingleton('BaseService', BaseService);

  return {
    prisma,
    container,
  };
}

export async function clearDatabase(prisma: PrismaClient) {
  const tables = [
    'RefreshToken',
    'PedidoItem',
    'Pedido',
    'Avaliacao',
    'Produto',
    'Endereco',
    'Usuario',
    'Cupom',
  ];

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
  }
}

export async function closeTestConnection(prisma: PrismaClient) {
  await prisma.$disconnect();
} 