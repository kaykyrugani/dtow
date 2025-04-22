/**
 * Testes de integração para o PaymentService
 *
 * Este arquivo contém testes de integração que verificam o comportamento
 * do PaymentService em diferentes cenários, incluindo:
 * - Processamento de webhooks
 * - Reembolsos
 * - Consultas
 * - Concorrência
 * - Performance
 * - Casos de borda
 *
 * @module PaymentService
 */

import { Test, TestingModule } from '@nestjs/testing';
import { PaymentServiceImpl } from './payment.service';
import { RedisService } from '@/modules/redis/redis.service';
import { PaymentStatus } from '../interfaces/payment-status.interface';
import { Payment } from '../entities/payment.entity';
import { CacheService } from '../../../services/cache.service';
import { ConfigService } from '@nestjs/config';
import { MetricsService } from '../../../services/metrics.service';

/**
 * Suite de testes de integração do PaymentService
 *
 * @group integration
 * @group payment
 */
describe('PaymentService Integration Tests', () => {
  let module: TestingModule;
  let paymentService: PaymentServiceImpl;
  let redisService: RedisService;
  let cacheService: CacheService;

  const mockWebhookData = {
    id: 'webhook_123',
    payment_id: 'payment_123',
    amount: 1000,
    currency: 'BRL',
    status: 'paid',
    payment_method: 'credit_card',
    customer_id: 'customer_123',
    order_id: 'order_123',
    metadata: {
      product_id: 'prod_123',
    },
  };

  const mockRedisService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    exists: jest.fn(),
    quit: jest.fn(),
    initialize: jest.fn(),
    getClient: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockMetricsService = {
    incrementRedisErrors: jest.fn(),
    incrementRedisConnections: jest.fn(),
    observeRedisOperationDuration: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        PaymentServiceImpl,
        {
          provide: CacheService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: RedisService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            connect: jest.fn(),
            disconnect: jest.fn(),
            executePipeline: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test_secret'),
          },
        },
        {
          provide: MetricsService,
          useValue: mockMetricsService,
        },
      ],
    }).compile();

    paymentService = module.get<PaymentServiceImpl>(PaymentServiceImpl);
    redisService = module.get<RedisService>(RedisService);
    cacheService = module.get<CacheService>(CacheService);

    // Limpa o Redis antes de cada teste usando pipeline
    await redisService.executePipeline([['flushall']]);
  });

  afterEach(async () => {
    await module.close();
    await redisService.quit();
    jest.clearAllMocks();
  });

  /**
   * Testes de processamento de webhook
   *
   * Verifica se o serviço processa corretamente os webhooks de pagamento,
   * incluindo:
   * - Criação de novos pagamentos
   * - Tratamento de webhooks duplicados
   * - Salvamento de referências (cliente/pedido)
   */
  describe('processWebhook', () => {
    it('deve processar um webhook e salvar o pagamento no banco', async () => {
      // Arrange
      jest.spyOn(redisService, 'get').mockResolvedValue(null);
      jest.spyOn(redisService, 'set').mockResolvedValue(true);

      // Act
      const payment = await paymentService.processWebhook(mockWebhookData);

      // Assert
      expect(payment).toBeDefined();
      expect(payment.id).toBe(mockWebhookData.payment_id);
      expect(payment.amount).toBe(mockWebhookData.amount);
      expect(payment.status).toBe(PaymentStatus.COMPLETED);
      expect(payment.webhookId).toBe(mockWebhookData.id);
      expect(redisService.set).toHaveBeenCalled();
    });

    it('deve ser idempotente ao receber webhooks duplicados', async () => {
      // Arrange
      const existingPayment = new Payment();
      Object.assign(existingPayment, {
        id: mockWebhookData.payment_id,
        amount: mockWebhookData.amount,
        status: PaymentStatus.COMPLETED,
        webhookId: mockWebhookData.id,
      });

      jest.spyOn(redisService, 'get').mockResolvedValueOnce(JSON.stringify(existingPayment));

      // Act
      const payment = await paymentService.processWebhook(mockWebhookData);

      // Assert
      expect(payment).toBeDefined();
      expect(payment.id).toBe(existingPayment.id);
      expect(payment.status).toBe(existingPayment.status);
      expect(redisService.set).not.toHaveBeenCalled();
    });
  });

  /**
   * Testes de reembolso
   *
   * Verifica se o serviço processa corretamente os reembolsos,
   * incluindo:
   * - Reembolso parcial
   * - Reembolso total
   * - Validações de valores
   * - Tratamento de pagamentos inexistentes
   */
  describe('refundPayment', () => {
    it('deve reembolsar um pagamento com sucesso', async () => {
      // Arrange
      const existingPayment = new Payment();
      Object.assign(existingPayment, {
        id: 'payment_123',
        amount: 1000,
        status: PaymentStatus.COMPLETED,
        refundedAmount: 0,
      });

      jest.spyOn(redisService, 'get').mockResolvedValueOnce(JSON.stringify(existingPayment));
      jest.spyOn(redisService, 'set').mockResolvedValue(true);

      // Act
      const payment = await paymentService.refundPayment('payment_123', 500, 'customer_request');

      // Assert
      expect(payment).toBeDefined();
      expect(payment.refundedAmount).toBe(500);
      expect(payment.status).toBe(PaymentStatus.PARTIALLY_REFUNDED);
      expect(redisService.set).toHaveBeenCalled();
    });

    it('deve falhar ao tentar reembolsar um pagamento inexistente', async () => {
      // Arrange
      jest.spyOn(redisService, 'get').mockResolvedValue(null);

      // Act & Assert
      await expect(paymentService.refundPayment('invalid_payment', 500)).rejects.toThrow(
        'Payment not found',
      );
    });

    it('deve falhar ao tentar reembolsar um valor maior que o pagamento', async () => {
      // Arrange
      const existingPayment = new Payment();
      Object.assign(existingPayment, {
        id: 'payment_123',
        amount: 1000,
        status: PaymentStatus.COMPLETED,
        refundedAmount: 0,
      });

      jest.spyOn(redisService, 'get').mockResolvedValueOnce(JSON.stringify(existingPayment));

      // Act & Assert
      await expect(paymentService.refundPayment('payment_123', 1500)).rejects.toThrow(
        'Refund amount cannot exceed payment amount',
      );
    });
  });

  /**
   * Testes de concorrência
   *
   * Verifica se o serviço lida corretamente com operações simultâneas,
   * incluindo:
   * - Processamento simultâneo de webhooks
   * - Reembolsos simultâneos
   * - Consistência dos dados
   */
  describe('Concurrency Tests', () => {
    it('should handle concurrent webhook processing', async () => {
      const webhookData1 = {
        id: 'webhook_123',
        payment_id: 'pi_123',
        amount: 1000,
        currency: 'brl',
        status: 'completed',
        payment_method: 'card',
        customer_id: 'cus_123',
        order_id: 'order_123',
      };

      const webhookData2 = {
        id: 'webhook_124',
        payment_id: 'pi_124',
        amount: 2000,
        currency: 'brl',
        status: 'completed',
        payment_method: 'card',
        customer_id: 'cus_123',
        order_id: 'order_123',
      };

      mockRedisService.get.mockImplementation((key: string) => {
        if (key.includes('webhook:')) return null;
        if (key.includes('customer:')) return JSON.stringify([]);
        if (key.includes('order:')) return JSON.stringify([]);
        return null;
      });

      mockRedisService.set.mockResolvedValue(true);

      const [payment1, payment2] = await Promise.all([
        paymentService.processWebhook(webhookData1),
        paymentService.processWebhook(webhookData2),
      ]);

      expect(payment1).toBeDefined();
      expect(payment2).toBeDefined();
      expect(payment1.id).toBe('pi_123');
      expect(payment2.id).toBe('pi_124');
    });

    it('should handle concurrent refunds', async () => {
      const payment = new Payment();
      payment.id = 'pi_123';
      payment.amount = 1000;
      payment.currency = 'brl';
      payment.status = PaymentStatus.COMPLETED;
      payment.paymentMethod = 'card';
      payment.customerId = 'cus_123';
      payment.orderId = 'order_123';
      payment.webhookId = 'webhook_123';
      payment.refundedAmount = 0;
      payment.createdAt = new Date();
      payment.updatedAt = new Date();

      mockRedisService.get.mockResolvedValue(JSON.stringify(payment));
      mockRedisService.set.mockResolvedValue(true);

      const [refund1, refund2] = await Promise.all([
        paymentService.refundPayment(payment.id, 300),
        paymentService.refundPayment(payment.id, 400),
      ]);

      expect(refund1.refundedAmount + refund2.refundedAmount).toBeLessThanOrEqual(payment.amount);
      expect(refund1.status).toBe(PaymentStatus.PARTIALLY_REFUNDED);
      expect(refund2.status).toBe(PaymentStatus.PARTIALLY_REFUNDED);
    });
  });

  /**
   * Testes de performance
   *
   * Verifica se o serviço atende aos requisitos de performance,
   * incluindo:
   * - Tempo de processamento de webhooks
   * - Tempo de processamento de reembolsos
   * - Limites de tempo aceitáveis
   */
  describe('Performance Tests', () => {
    it('should process webhook within acceptable time', async () => {
      const webhookData = {
        id: 'webhook_123',
        payment_id: 'pi_123',
        amount: 1000,
        currency: 'brl',
        status: 'completed',
        payment_method: 'card',
        customer_id: 'cus_123',
        order_id: 'order_123',
      };

      mockRedisService.get.mockResolvedValue(null);
      mockRedisService.set.mockResolvedValue(true);

      const startTime = Date.now();
      await paymentService.processWebhook(webhookData);
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(1000); // Deve processar em menos de 1 segundo
    });

    it('should process refund within acceptable time', async () => {
      const payment = new Payment();
      payment.id = 'pi_123';
      payment.amount = 1000;
      payment.status = PaymentStatus.COMPLETED;
      payment.refundedAmount = 0;

      mockRedisService.get.mockResolvedValue(JSON.stringify(payment));
      mockRedisService.set.mockResolvedValue(true);

      const startTime = Date.now();
      await paymentService.refundPayment(payment.id, 500);
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(1000); // Deve processar em menos de 1 segundo
    });
  });

  /**
   * Testes de casos de borda
   *
   * Verifica se o serviço lida corretamente com situações extremas,
   * incluindo:
   * - Valores muito grandes
   * - Valores muito pequenos
   * - Caracteres especiais
   * - Metadados vazios/nulos
   */
  describe('Edge Cases', () => {
    it('should handle very large payment amounts', async () => {
      const webhookData = {
        id: 'webhook_123',
        payment_id: 'pi_123',
        amount: Number.MAX_SAFE_INTEGER,
        currency: 'brl',
        status: 'completed',
        payment_method: 'card',
        customer_id: 'cus_123',
        order_id: 'order_123',
      };

      mockRedisService.get.mockResolvedValue(null);
      mockRedisService.set.mockResolvedValue(true);

      const payment = await paymentService.processWebhook(webhookData);
      expect(payment.amount).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should handle very small payment amounts', async () => {
      const webhookData = {
        id: 'webhook_123',
        payment_id: 'pi_123',
        amount: 0.01,
        currency: 'brl',
        status: 'completed',
        payment_method: 'card',
        customer_id: 'cus_123',
        order_id: 'order_123',
      };

      mockRedisService.get.mockResolvedValue(null);
      mockRedisService.set.mockResolvedValue(true);

      const payment = await paymentService.processWebhook(webhookData);
      expect(payment.amount).toBe(0.01);
    });

    it('should handle special characters in IDs', async () => {
      const webhookData = {
        id: 'webhook_123!@#$%^&*()',
        payment_id: 'pi_123!@#$%^&*()',
        amount: 1000,
        currency: 'brl',
        status: 'completed',
        payment_method: 'card',
        customer_id: 'cus_123!@#$%^&*()',
        order_id: 'order_123!@#$%^&*()',
      };

      mockRedisService.get.mockResolvedValue(null);
      mockRedisService.set.mockResolvedValue(true);

      const payment = await paymentService.processWebhook(webhookData);
      expect(payment.id).toBe('pi_123!@#$%^&*()');
      expect(payment.webhookId).toBe('webhook_123!@#$%^&*()');
      expect(payment.customerId).toBe('cus_123!@#$%^&*()');
      expect(payment.orderId).toBe('order_123!@#$%^&*()');
    });

    it('should handle empty metadata', async () => {
      const webhookData = {
        id: 'webhook_123',
        payment_id: 'pi_123',
        amount: 1000,
        currency: 'brl',
        status: 'completed',
        payment_method: 'card',
        customer_id: 'cus_123',
        order_id: 'order_123',
        metadata: {},
      };

      mockRedisService.get.mockResolvedValue(null);
      mockRedisService.set.mockResolvedValue(true);

      const payment = await paymentService.processWebhook(webhookData);
      expect(payment.metadata).toEqual({});
    });

    it('should handle null metadata', async () => {
      const webhookData = {
        id: 'webhook_123',
        payment_id: 'pi_123',
        amount: 1000,
        currency: 'brl',
        status: 'completed',
        payment_method: 'card',
        customer_id: 'cus_123',
        order_id: 'order_123',
        metadata: null,
      };

      mockRedisService.get.mockResolvedValue(null);
      mockRedisService.set.mockResolvedValue(true);

      const payment = await paymentService.processWebhook(webhookData);
      expect(payment.metadata).toBeNull();
    });
  });

  describe('getPaymentById', () => {
    it('deve retornar um pagamento existente', async () => {
      // Arrange
      const existingPayment = new Payment();
      Object.assign(existingPayment, {
        id: 'payment_123',
        amount: 1000,
        status: PaymentStatus.COMPLETED,
      });

      jest.spyOn(redisService, 'get').mockResolvedValueOnce(JSON.stringify(existingPayment));

      // Act
      const payment = await paymentService.getPaymentById('payment_123');

      // Assert
      expect(payment).toBeDefined();
      expect(payment?.id).toBe(existingPayment.id);
      expect(payment?.amount).toBe(existingPayment.amount);
      expect(payment?.status).toBe(existingPayment.status);
    });

    it('deve retornar null para um pagamento inexistente', async () => {
      // Arrange
      jest.spyOn(redisService, 'get').mockResolvedValue(null);

      // Act
      const payment = await paymentService.getPaymentById('invalid_payment');

      // Assert
      expect(payment).toBeNull();
    });
  });

  describe('getPaymentsByCustomerId', () => {
    it('deve retornar lista de pagamentos do cliente', async () => {
      // Arrange
      const payments = [
        {
          id: 'payment_1',
          amount: 1000,
          status: PaymentStatus.COMPLETED,
          customerId: 'customer_123',
        },
        {
          id: 'payment_2',
          amount: 2000,
          status: PaymentStatus.COMPLETED,
          customerId: 'customer_123',
        },
      ];

      jest.spyOn(redisService, 'get').mockResolvedValueOnce(JSON.stringify(payments));

      // Act
      const result = await paymentService.getPaymentsByCustomerId('customer_123');

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('payment_1');
      expect(result[1].id).toBe('payment_2');
    });

    it('deve retornar array vazio quando cliente não tem pagamentos', async () => {
      // Arrange
      jest.spyOn(redisService, 'get').mockResolvedValue(null);

      // Act
      const result = await paymentService.getPaymentsByCustomerId('customer_123');

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('getPaymentsByOrderId', () => {
    it('deve retornar lista de pagamentos do pedido', async () => {
      // Arrange
      const payments = [
        {
          id: 'payment_1',
          amount: 1000,
          status: PaymentStatus.COMPLETED,
          orderId: 'order_123',
        },
        {
          id: 'payment_2',
          amount: 2000,
          status: PaymentStatus.COMPLETED,
          orderId: 'order_123',
        },
      ];

      jest.spyOn(redisService, 'get').mockResolvedValueOnce(JSON.stringify(payments));

      // Act
      const result = await paymentService.getPaymentsByOrderId('order_123');

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('payment_1');
      expect(result[1].id).toBe('payment_2');
    });

    it('deve retornar array vazio quando pedido não tem pagamentos', async () => {
      // Arrange
      jest.spyOn(redisService, 'get').mockResolvedValue(null);

      // Act
      const result = await paymentService.getPaymentsByOrderId('order_123');

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('getPaymentByWebhookId', () => {
    it('deve retornar pagamento pelo webhook ID', async () => {
      // Arrange
      const existingPayment = new Payment();
      Object.assign(existingPayment, {
        id: 'payment_123',
        amount: 1000,
        status: PaymentStatus.COMPLETED,
        webhookId: 'webhook_123',
      });

      jest.spyOn(redisService, 'get').mockResolvedValueOnce(JSON.stringify(existingPayment));

      // Act
      const payment = await paymentService.getPaymentByWebhookId('webhook_123');

      // Assert
      expect(payment).toBeDefined();
      expect(payment?.id).toBe('payment_123');
      expect(payment?.webhookId).toBe('webhook_123');
    });

    it('deve retornar null quando webhook ID não existe', async () => {
      // Arrange
      jest.spyOn(redisService, 'get').mockResolvedValue(null);

      // Act
      const payment = await paymentService.getPaymentByWebhookId('invalid_webhook');

      // Assert
      expect(payment).toBeNull();
    });
  });
});
