import { Test, TestingModule } from '@nestjs/testing';
import { PaymentServiceImpl } from './payment.service';
import { MetricsService } from '../../../services/metrics.service';
import { CacheService } from '../../../services/cache.service';
import { PrismaClient } from '@prisma/client';
import { WebhookData } from '../interfaces/webhook-data.interface';
import { PaymentStatus } from '../interfaces/payment-status.interface';
import { RedisService } from '../../../modules/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { Payment } from '../entities/payment.entity';

jest.mock('../../../services/metrics.service');

describe('PaymentService Load Tests', () => {
  let service: PaymentServiceImpl;
  let prisma: PrismaClient;
  let redisService: RedisService;
  let cacheService: CacheService;

  const CONCURRENT_REQUESTS = 50;
  const TOTAL_REQUESTS = 1000;
  const PAYMENT_AMOUNTS = ['10.00', '50.00', '100.00', '500.00', '1000.00'];

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
    prisma = module.get<PrismaClient>(PrismaClient);
    redisService = module.get<RedisService>(RedisService);
    cacheService = module.get<CacheService>(CacheService);

    await redisService.initialize();
  });

  afterAll(async () => {
    await prisma.payment.deleteMany({
      where: {
        id: {
          startsWith: 'load-test-',
        },
      },
    });
    await prisma.order.deleteMany({
      where: {
        id: {
          startsWith: 'ORDER-LOAD-',
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

  const generateWebhookData = (index: number): WebhookData => ({
    action: 'payment.created',
    data: {
      id: `load-test-${index}`,
      amount: PAYMENT_AMOUNTS[Math.floor(Math.random() * PAYMENT_AMOUNTS.length)],
      external_reference: `ORDER-LOAD-${index}`,
    },
    paymentType: 'credit_card',
    timestamp: Date.now(),
    status: PaymentStatus.COMPLETED,
  });

  const processWebhookBatch = async (startIndex: number, batchSize: number): Promise<Payment[]> => {
    const promises = Array.from({ length: batchSize }, (_, i) => {
      const webhookData = generateWebhookData(startIndex + i);
      return service.processWebhook(webhookData);
    });
    return Promise.all(promises);
  };

  it('deve processar múltiplos webhooks concorrentes', async () => {
    const startTime = Date.now();
    const batches = Math.ceil(TOTAL_REQUESTS / CONCURRENT_REQUESTS);
    const results: Payment[][] = [];

    for (let i = 0; i < batches; i++) {
      const batchStartIndex = i * CONCURRENT_REQUESTS;
      const batchSize = Math.min(CONCURRENT_REQUESTS, TOTAL_REQUESTS - batchStartIndex);
      const batchResults = await processWebhookBatch(batchStartIndex, batchSize);
      results.push(batchResults);
    }

    const endTime = Date.now();
    const totalTime = endTime - startTime;
    const requestsPerSecond = (TOTAL_REQUESTS / totalTime) * 1000;

    // Verificar se todos os pagamentos foram criados
    const savedPayments = await prisma.payment.findMany({
      where: {
        id: {
          startsWith: 'load-test-',
        },
      },
    });

    expect(savedPayments.length).toBe(TOTAL_REQUESTS);
    expect(requestsPerSecond).toBeGreaterThan(10); // Mínimo de 10 requisições por segundo

    // Registrar métricas de performance
    MetricsService.observePaymentProcessingDuration('load_test', 'batch', totalTime);
    MetricsService.recordPaymentAmount(requestsPerSecond, 'load_test');
  });

  it('deve lidar com falhas de rede e retry', async () => {
    const webhookData = generateWebhookData(0);
    const maxRetries = 3;
    let retryCount = 0;

    // Simular falha de rede
    jest.spyOn(prisma.payment, 'create').mockImplementation(async () => {
      if (retryCount < maxRetries) {
        retryCount++;
        throw new Error('Erro de rede simulado');
      }
      const payment = new Payment();
      payment.id = webhookData.data.id;
      payment.amount = Number(webhookData.data.amount);
      payment.status = webhookData.status;
      payment.orderId = webhookData.data.external_reference;
      payment.paymentMethod = webhookData.paymentType;
      payment.customerId = 'cus_123';
      payment.currency = 'brl';
      payment.webhookId = webhookData.data.id;
      payment.createdAt = new Date();
      payment.updatedAt = new Date();
      return payment;
    });

    await service.processWebhook(webhookData);

    expect(retryCount).toBe(maxRetries);
    expect(MetricsService.recordPaymentFailure).toHaveBeenCalledTimes(maxRetries);
  });

  it('deve manter a consistência do cache sob carga', async () => {
    const webhookData = generateWebhookData(0);
    const cacheKey = `payment:${webhookData.data.id}`;

    // Processar o mesmo webhook múltiplas vezes
    const promises = Array.from({ length: 10 }, () => service.processWebhook(webhookData));
    await Promise.all(promises);

    // Verificar se apenas um registro foi criado
    const savedPayments = await prisma.payment.findMany({
      where: { id: webhookData.data.id },
    });

    expect(savedPayments.length).toBe(1);
    expect(MetricsService.recordPaymentFailure).toHaveBeenCalledWith('idempotency');
  });

  it('deve processar reembolsos em lote', async () => {
    // Criar pagamentos para teste
    const payments = await Promise.all(
      Array.from({ length: 100 }, async (_, i) => {
        const webhookData = generateWebhookData(i);
        await service.processWebhook(webhookData);
        return webhookData.data.id;
      }),
    );

    const startTime = Date.now();

    // Processar reembolsos em paralelo
    const refundPromises = payments.map(paymentId => service.refundPayment(paymentId, 10.0));
    await Promise.all(refundPromises);

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    // Verificar se todos os reembolsos foram processados
    const refundedPayments = await prisma.payment.findMany({
      where: {
        id: {
          in: payments,
        },
        status: PaymentStatus.REFUNDED,
      },
    });

    expect(refundedPayments.length).toBe(payments.length);
    expect(totalTime).toBeLessThan(5000); // Máximo de 5 segundos para processar 100 reembolsos
  });
});
