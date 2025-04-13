import { PrismaClient } from '@prisma/client';

const prismaClientConfig = {
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
  errorFormat: 'minimal'
};

export const prisma = new PrismaClient(prismaClientConfig);

// Singleton pattern para reutilização da conexão
export const getPrismaInstance = (() => {
  let instance: PrismaClient;
  
  return () => {
    if (!instance) {
      instance = prisma;
    }
    return instance;
  };
})();

// Função de desconexão para testes
export const disconnectPrisma = async () => {
  await prisma.$disconnect();
}; 