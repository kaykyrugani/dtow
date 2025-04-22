import { Test, TestingModule } from '@nestjs/testing';
import { PaymentServiceImpl } from '../../services/payment.service';
import { RedisService } from '../../../redis/redis.service';
import { PaymentStatus } from '../../interfaces/payment-status.interface';
import { Payment } from '../../entities/payment.entity';

describe('PaymentService Integration Tests', () => {
  let service: PaymentServiceImpl;
  let redisService: RedisService;

  const mockWebhookData = {
    id: 'webhook_123',
    payment_id: 'payment_123',
    amount: 1000,
    currency: 'BRL',
    status: PaymentStatus.COMPLETED,
    payment_method: 'credit_card',
    customer_id: 'customer_123',
    order_id: 'order_123',
    metadata: {
      product_id: 'prod_123',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentServiceImpl,
        {
          provide: RedisService,
          useValue: {
            connect: jest.fn(),
            disconnect: jest.fn(),
            executePipeline: jest.fn(),
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentServiceImpl>(PaymentServiceImpl);
    redisService = module.get<RedisService>(RedisService);
  });

  afterEach(async () => {
    await redisService.executePipeline([['flushall']]);
  });

  describe('processWebhook', () => {
    it('deve processar um webhook e salvar o pagamento no banco de dados', async () => {
      const result = await service.processWebhook(mockWebhookData);

      expect(result).toBeDefined();
      expect(result.id).toBe(mockWebhookData.payment_id);
      expect(result.amount).toBe(mockWebhookData.amount);
      expect(result.status).toBe(PaymentStatus.COMPLETED);
    });

    it('deve ser idempotente para webhooks duplicados', async () => {
      const firstResult = await service.processWebhook(mockWebhookData);
      const secondResult = await service.processWebhook(mockWebhookData);

      expect(secondResult.id).toBe(firstResult.id);
      expect(secondResult.amount).toBe(firstResult.amount);
    });
  });

  describe('refundPayment', () => {
    it('deve reembolsar um pagamento com sucesso', async () => {
      await service.processWebhook(mockWebhookData);
      const refundAmount = 500;

      const result = await service.refundPayment(mockWebhookData.payment_id, refundAmount);

      expect(result).toBeDefined();
      expect(result.refundedAmount).toBe(refundAmount);
      expect(result.status).toBe(PaymentStatus.PARTIALLY_REFUNDED);
    });

    it('deve retornar null para pagamento inexistente', async () => {
      const result = await service.refundPayment('non_existent', 500);
      expect(result).toBeNull();
    });

    it('deve retornar null quando o valor do reembolso excede o valor do pagamento', async () => {
      await service.processWebhook(mockWebhookData);
      const result = await service.refundPayment(mockWebhookData.payment_id, 2000);
      expect(result).toBeNull();
    });
  });

  describe('getPaymentById', () => {
    it('deve retornar um pagamento existente', async () => {
      await service.processWebhook(mockWebhookData);
      const result = await service.getPaymentById(mockWebhookData.payment_id);

      expect(result).toBeDefined();
      if (result) {
        expect(result.id).toBe(mockWebhookData.payment_id);
      }
    });

    it('deve retornar null para pagamento inexistente', async () => {
      const result = await service.getPaymentById('non_existent');
      expect(result).toBeNull();
    });
  });

  describe('getPaymentsByCustomerId', () => {
    it('deve retornar uma lista de pagamentos do cliente', async () => {
      await service.processWebhook(mockWebhookData);
      const result = await service.getPaymentsByCustomerId(mockWebhookData.customer_id);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].customerId).toBe(mockWebhookData.customer_id);
    });

    it('deve retornar array vazio quando não há pagamentos', async () => {
      const result = await service.getPaymentsByCustomerId('non_existent');
      expect(result).toEqual([]);
    });
  });

  describe('getPaymentsByOrderId', () => {
    it('deve retornar uma lista de pagamentos do pedido', async () => {
      await service.processWebhook(mockWebhookData);
      const result = await service.getPaymentsByOrderId(mockWebhookData.order_id);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].orderId).toBe(mockWebhookData.order_id);
    });

    it('deve retornar array vazio quando não há pagamentos', async () => {
      const result = await service.getPaymentsByOrderId('non_existent');
      expect(result).toEqual([]);
    });
  });

  describe('getPaymentByWebhookId', () => {
    it('deve retornar um pagamento pelo ID do webhook', async () => {
      await service.processWebhook(mockWebhookData);
      const result = await service.getPaymentByWebhookId(mockWebhookData.id);

      expect(result).toBeDefined();
      if (result) {
        expect(result.webhookId).toBe(mockWebhookData.id);
      }
    });

    it('deve retornar null quando o webhook não existe', async () => {
      const result = await service.getPaymentByWebhookId('non_existent');
      expect(result).toBeNull();
    });
  });
});
