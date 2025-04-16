import { beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { redisService } from '../src/services/redis.service';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Limpa o banco de dados antes dos testes
  await prisma.$executeRaw`TRUNCATE TABLE "Usuario" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Produto" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Pedido" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Endereco" CASCADE`;
});

afterAll(async () => {
  // Fecha as conexões após os testes
  await prisma.$disconnect();
  await redisService.quit();
}); 