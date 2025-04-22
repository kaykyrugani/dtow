import { beforeAll, afterAll, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { redisService } from '../src/services/redis.service';
import { MetricsService } from '../src/modules/metrics/metrics.service';
import { CacheService } from '../src/modules/cache/cache.service';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../src/modules/redis/redis.service';

// Inicializa o PrismaClient
const prisma = new PrismaClient();

// Inicializa o MetricsService
const metricsService = new MetricsService();

// Conecta ao banco de dados antes de todos os testes
beforeAll(async () => {
  await prisma.$connect();
});

// Desconecta do banco de dados após todos os testes
afterAll(async () => {
  await prisma.$disconnect();
});

// Limpa o cache e métricas antes de cada teste
beforeEach(async () => {
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.auditLog.deleteMany();
  metricsService.resetMetrics();

  const redis = new RedisService({
    get: () => ({
      host: 'localhost',
      port: 6379,
      db: 0,
    }),
  } as any);

  await redis.onModuleInit();
  const client = redis.getClient();
  await client.flushdb();
});

// Limpeza após os testes
afterAll(async () => {
  await redisService.quit();
});

jest.mock('@nestjs/config', () => ({
  ConfigService: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockImplementation((key: string) => {
      const config = {
        'redis.host': 'localhost',
        'redis.port': 6379,
        'redis.password': undefined,
        'redis.db': 0,
        'redis.keyPrefix': 'onlywave:',
        'redis.ttl': 3600,
      };
      return config[key];
    }),
  })),
}));

// Configuração global do Jest
beforeAll(() => {
  // Configurações globais antes de todos os testes
});

afterAll(() => {
  // Limpeza após todos os testes
  jest.clearAllMocks();
});
