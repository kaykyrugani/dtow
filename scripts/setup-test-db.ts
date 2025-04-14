import { exec } from 'child_process';
import { promisify } from 'util';
import * as dotenv from 'dotenv';

const execAsync = promisify(exec);

async function setupTestDatabase() {
  console.log('🔧 Configurando banco de dados de teste...');

  try {
    // Carregar variáveis de ambiente
    dotenv.config();

    // Verificar variáveis necessárias
    if (!process.env.DATABASE_URL_TEST) {
      throw new Error('DATABASE_URL_TEST não está definida!');
    }

    // Backup da URL original
    const originalUrl = process.env.DATABASE_URL;
    
    try {
      // Usar URL do banco de teste
      process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;

      // Gerar cliente Prisma
      console.log('📦 Gerando Prisma Client...');
      await execAsync('npx prisma generate');

      // Aplicar migrações
      console.log('🔄 Aplicando migrações...');
      await execAsync('npx prisma migrate deploy');

      console.log('✅ Banco de dados de teste configurado com sucesso!');
    } finally {
      // Restaurar URL original
      process.env.DATABASE_URL = originalUrl;
    }
  } catch (error) {
    console.error('❌ Erro ao configurar banco de dados de teste:', error);
    process.exit(1);
  }
}

setupTestDatabase(); 