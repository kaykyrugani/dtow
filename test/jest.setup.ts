import { config } from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env.test
config({ path: '.env.test' });

// Configura o timeout global para os testes
jest.setTimeout(30000);

// Configura o ambiente de teste
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.REDIS_HOST = 'localhost';
process.env.REDIS_PORT = '6379';
process.env.REDIS_DB = '1';
process.env.REDIS_PASSWORD = '';
process.env.ALLOWED_ORIGINS = 'http://localhost:3000'; 