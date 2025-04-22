import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PaymentServiceImpl } from './payment.service';
import { MetricsService } from '../../metrics/metrics.service';
import { CacheService } from '../../cache/cache.service';
import { PrismaClient } from '@prisma/client';
import { WebhookData } from '../interfaces/webhook-data.interface';
import { PaymentData } from '../interfaces/payment-data.interface';
import { RedisService } from '../../../modules/redis/redis.service';
import { PaymentStatus } from '../interfaces/payment-status.interface';
import { Payment } from '../interfaces/payment.interface';

describe('PaymentService Resilience Tests', () => {
  let service: PaymentServiceImpl;
  let metricsService: MetricsService;
  let cacheService: CacheService;
  let prisma: PrismaClient;
  let redisService: RedisService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('fake-token'),
  };

  const mockMetricsService = {
    recordPaymentProcessed: jest.fn(),
    recordPaymentAmount: jest.fn(),
    recordPaymentProcessingDuration: jest.fn(),
    recordPaymentFailure: jest.fn(),
    recordPaymentRefunded: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  const mockPrisma = {
    payment: {
      create: jest.fn(),
      update: jest.fn(),
    },
    order: {
      update: jest.fn(),
    },
  };

  const mockWebhookData: WebhookData = {
    action: 'payment.created',
    data: {
      id: 'resilience-test-123',
      amount: '150.00',
      external_reference: 'ORDER-RESILIENCE-123',
    },
    paymentType: 'credit_card',
    timestamp: Date.now(),
    status: PaymentStatus.COMPLETED,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentServiceImpl,
        MetricsService,
        CacheService,
        RedisService,
        ConfigService,
        {
          provide: PrismaClient,
          useValue: new PrismaClient(),
        },
      ],
    }).compile();

    service = module.get<PaymentServiceImpl>(PaymentServiceImpl);
    metricsService = module.get<MetricsService>(MetricsService);
    cacheService = module.get<CacheService>(CacheService);
    prisma = module.get<PrismaClient>(PrismaClient);
    redisService = module.get<RedisService>(RedisService);

    await redisService.initialize();
  });

  afterAll(async () => {
    await prisma.payment.deleteMany({
      where: {
        id: {
          startsWith: 'resilience-test-',
        },
      },
    });
    await prisma.order.deleteMany({
      where: {
        id: {
          startsWith: 'ORDER-RESILIENCE-',
        },
      },
    });
    await redisService.quit();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    const client = redisService.getClient();
    await client.flushall();
  });

  it('deve lidar com falha do Redis', async () => {
    // Simular falha do Redis
    jest.spyOn(redisService, 'getClient').mockImplementation(() => {
      throw new Error('Redis connection failed');
    });

    // O serviço deve continuar funcionando mesmo com Redis falhando
    await service.processWebhook(mockWebhookData);

    const savedPayment = await prisma.payment.findUnique({
      where: { id: mockWebhookData.data.id },
    });

    expect(savedPayment).toBeDefined();
    expect(metricsService.recordPaymentFailure).toHaveBeenCalledWith('redis_error');
  });

  it('deve lidar com falha do Prisma', async () => {
    // Simular falha do Prisma
    jest.spyOn(prisma.payment, 'create').mockRejectedValue(new Error('Database connection failed'));

    await expect(service.processWebhook(mockWebhookData)).rejects.toThrow();
    expect(metricsService.recordPaymentFailure).toHaveBeenCalledWith('database_error');
  });

  it('deve lidar com dados inválidos', async () => {
    const invalidWebhookData = {
      ...mockWebhookData,
      data: {
        ...mockWebhookData.data,
        amount: 'invalid',
      },
    };

    await expect(service.processWebhook(invalidWebhookData)).rejects.toThrow();
    expect(metricsService.recordPaymentFailure).toHaveBeenCalledWith('validation_error');
  });

  it('deve lidar com webhooks fora de ordem', async () => {
    const webhook1 = {
      ...mockWebhookData,
      data: {
        ...mockWebhookData.data,
        id: 'test-1',
        amount: '100.00',
      },
      timestamp: Date.now() - 1000,
    };

    const webhook2 = {
      ...mockWebhookData,
      data: {
        ...mockWebhookData.data,
        id: 'test-2',
        amount: '200.00',
      },
      timestamp: Date.now() - 2000,
    };

    // Processar webhooks fora de ordem
    await service.processWebhook(webhook2);
    await service.processWebhook(webhook1);

    expect(metricsService.recordPaymentFailure).toHaveBeenCalledWith('out_of_order');
  });

  it('deve lidar com falha de rede durante reembolso', async () => {
    // Criar pagamento para teste
    await service.processWebhook(mockWebhookData);

    // Simular falha de rede durante reembolso
    jest.spyOn(prisma.payment, 'update').mockRejectedValue(new Error('Network error'));

    await expect(service.refundPayment(mockWebhookData.data.id, 50.0)).rejects.toThrow();
    expect(metricsService.recordPaymentFailure).toHaveBeenCalledWith('network_error');
  });

  it('deve lidar com falha de cache durante reembolso', async () => {
    // Criar pagamento para teste
    await service.processWebhook(mockWebhookData);

    // Simular falha do cache
    jest.spyOn(cacheService, 'get').mockRejectedValue(new Error('Cache error'));

    await expect(service.refundPayment(mockWebhookData.data.id, 50.0)).rejects.toThrow();
    expect(metricsService.recordPaymentFailure).toHaveBeenCalledWith('cache_error');
  });

  it('deve lidar com falha de validação durante reembolso', async () => {
    // Criar pagamento para teste
    await service.processWebhook(mockWebhookData);

    // Tentar reembolso com valor inválido
    await expect(service.refundPayment(mockWebhookData.data.id, -50.0)).rejects.toThrow();
    expect(metricsService.recordPaymentFailure).toHaveBeenCalledWith('validation_error');
  });

  it('deve lidar com falha de concorrência', async () => {
    // Criar pagamento para teste
    await service.processWebhook(mockWebhookData);

    // Simular condição de corrida
    const updateSpy = jest.spyOn(prisma.payment, 'update');
    updateSpy.mockImplementationOnce(() => {
      throw new Error('Concurrent update detected');
    });

    await expect(service.refundPayment(mockWebhookData.data.id, 50.0)).rejects.toThrow();
    expect(metricsService.recordPaymentFailure).toHaveBeenCalledWith('concurrency_error');
  });
});
