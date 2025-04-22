import { PrismaClient } from '@prisma/client';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reseta o banco de dados de teste
  execSync('npx prisma migrate reset --force');
});

afterEach(async () => {
  // Limpa todas as tabelas após cada teste
  const tables = ['Usuario', 'Endereco', 'Produto', 'Avaliacao', 'Pedido', 'PedidoItem', 'Cupom'];

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
  }
});

afterAll(async () => {
  // Fecha a conexão com o banco
  await prisma.$disconnect();
});
