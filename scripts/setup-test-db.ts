import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

async function setupTestDatabase() {
  console.log('🔧 Configurando banco de dados de teste...');

  try {
    // Executa as migrações
    console.log('📦 Executando migrações...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });

    // Conecta ao banco de dados
    const prisma = new PrismaClient();

    // Limpa o banco de dados
    console.log('🧹 Limpando banco de dados...');
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

    await prisma.$disconnect();
    console.log('✅ Banco de dados de teste configurado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao configurar banco de dados de teste:', error);
    process.exit(1);
  }
}

setupTestDatabase(); 