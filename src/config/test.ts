import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { TokenService } from '../services/TokenService';
import { AuthService } from '../services/authService';
import { BaseService } from '../services/BaseService';

export async function setupTestContainer() {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();

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
  } catch (error) {
    console.error('Erro ao configurar container de teste:', error);
    throw error;
  }
}

export async function clearDatabase(prisma: PrismaClient) {
  try {
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
  } catch (error) {
    console.error('Erro ao limpar banco de dados:', error);
    throw error;
  }
}

export async function closeTestConnection(prisma: PrismaClient) {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error('Erro ao fechar conexão com banco de dados:', error);
    throw error;
  }
} 