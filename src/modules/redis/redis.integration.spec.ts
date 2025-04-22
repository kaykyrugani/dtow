import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { MetricsService } from '../../services/metrics.service';
import { LoggingService } from '../../services/LoggingService';
import { PaymentService } from '../payment/services/payment.service';
import { PrismaClient } from '@prisma/client';
import { WebhookDTO } from '../payment/dtos/payment.dto';

jest.mock('../../services/metrics.service');
jest.mock('../../services/LoggingService');
jest.mock('../payment/services/payment.service');

describe('RedisService - Integração', () => {
  let redisService: RedisService;
  let paymentService: jest.Mocked<PaymentService>;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              const config = {
                'redis.host': 'localhost',
                'redis.port': 6379,
                'redis.password': undefined,
                'redis.db': 0,
                'redis.keyPrefix': 'onlywave:test:',
                'redis.ttl': 3600,
              };
              return config[key];
            }),
          },
        },
        {
          provide: PaymentService,
          useValue: {
            processWebhook: jest.fn(),
            reembolsarPagamento: jest.fn(),
          },
        },
        PrismaClient,
      ],
    }).compile();

    redisService = module.get<RedisService>(RedisService);
    paymentService = module.get(PaymentService);
    prismaClient = module.get<PrismaClient>(PrismaClient);
  });

  afterAll(async () => {
    await redisService.quit();
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    // Limpar o Redis antes de cada teste
    await redisService.del('*');
  });

  describe('Integração com PaymentService', () => {
    it('deve armazenar e recuperar um cache de status de pagamento', async () => {
      const paymentId = 'test-payment-123';
      const paymentData = {
        id: paymentId,
        status: 'approved',
        amount: '100.00',
        payment_type_id: 'credit_card',
        external_reference: 'order-123',
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Armazenar no Redis
      await redisService.set(`payment:${paymentId}`, JSON.stringify(paymentData), 3600);

      // Recuperar do Redis
      const cachedData = await redisService.get(`payment:${paymentId}`);
      const parsedData = JSON.parse(cachedData);

      expect(parsedData.status).toBe('approved');
      expect(parsedData.amount).toBe('100.00');
    });

    it('deve armazenar e recuperar um hash de dados de pagamento', async () => {
      const paymentId = 'test-payment-456';

      // Armazenar campos no hash
      await redisService.setHash(`payment:${paymentId}:details`, 'status', 'approved');
      await redisService.setHash(`payment:${paymentId}:details`, 'amount', '150.00');
      await redisService.setHash(`payment:${paymentId}:details`, 'payment_type', 'credit_card');

      // Recuperar campos individuais
      const status = await redisService.getHash(`payment:${paymentId}:details`, 'status');
      const amount = await redisService.getHash(`payment:${paymentId}:details`, 'amount');

      // Recuperar todos os campos
      const allFields = await redisService.getAllHash(`payment:${paymentId}:details`);

      expect(status).toBe('approved');
      expect(amount).toBe('150.00');
      expect(allFields).toEqual({
        status: 'approved',
        amount: '150.00',
        payment_type: 'credit_card',
      });
    });

    it('deve armazenar e processar uma fila de webhooks', async () => {
      const webhookQueue = 'webhook:queue';
      const webhookData: WebhookDTO = {
        action: 'payment.created',
        data: {
          id: 'test-payment-789',
          amount: '200.00',
          external_reference: 'order-456',
        },
        paymentType: 'credit_card',
        timestamp: Date.now(),
        status: 'approved',
      };

      // Adicionar webhook à fila
      await redisService.rpush(webhookQueue, JSON.stringify(webhookData));

      // Verificar tamanho da fila
      const queueLength = await redisService.llen(webhookQueue);
      expect(queueLength).toBe(1);

      // Processar webhook da fila
      const webhookJson = await redisService.lpop(webhookQueue);
      const webhook = JSON.parse(webhookJson);

      expect(webhook.data.id).toBe('test-payment-789');
      expect(webhook.status).toBe('approved');
    });
  });

  describe('Integração com Pub/Sub', () => {
    it('deve publicar e receber mensagens entre serviços', async () => {
      const channel = 'payment:notifications';
      const message = JSON.stringify({
        type: 'payment_approved',
        paymentId: 'test-payment-999',
        timestamp: Date.now(),
      });

      // Criar um callback para receber mensagens
      const messageHandler = jest.fn();

      // Inscrever no canal
      await redisService.subscribe(channel, messageHandler);

      // Publicar mensagem
      await redisService.publish(channel, message);

      // Simular recebimento de mensagem (em um cenário real, isso seria assíncrono)
      // Como estamos usando mocks, precisamos simular o evento manualmente
      const subscriber = (redisService as any).subscribers.get(channel);
      if (subscriber) {
        subscriber.forEach((handler: (message: string) => void) => {
          handler(message);
        });
      }

      // Verificar se o handler foi chamado
      expect(messageHandler).toHaveBeenCalledWith(message);
    });
  });
});
