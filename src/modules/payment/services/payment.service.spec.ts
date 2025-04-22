import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { MetricsService } from '../../../services/metrics.service';
import { CacheService } from '../../../services/cache.service';
import { LoggingService } from '../../../services/LoggingService';
import { WebhookDto } from '../dto/webhook.dto';
import { PrismaClient } from '@prisma/client';
import { PaymentData } from '../interfaces/payment-data.interface';
import { PaymentStatus } from '../interfaces/payment-status.interface';

jest.mock('../../../services/metrics.service');

describe('PaymentService', () => {
  let service: PaymentService;
  let cacheService: CacheService;
  let prisma: PrismaClient;

  const mockWebhookData: WebhookDto = {
    id: '123',
    payment_id: '123',
    amount: 100.0,
    currency: 'BRL',
    status: 'approved',
    payment_type: 'credit_card',
    external_reference: 'ORDER-123',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockPaymentData: PaymentData = {
    id: '123',
    amount: 100.0,
    status: 'approved',
    external_reference: 'ORDER-123',
    payment_type_id: 'credit_card',
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: MetricsService,
          useValue: MetricsService,
        },
        {
          provide: CacheService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            exists: jest.fn(),
          },
        },
        {
          provide: PrismaClient,
          useValue: {
            payment: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
            order: {
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    cacheService = module.get<CacheService>(CacheService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processWebhook', () => {
    it('deve processar webhook com sucesso', async () => {
      jest.spyOn(prisma.payment, 'create').mockResolvedValue(mockPaymentData);

      await service.processWebhook(mockWebhookData);

      expect(prisma.payment.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          id: mockWebhookData.id,
          amount: mockWebhookData.amount,
          status: mockWebhookData.status,
          external_reference: mockWebhookData.external_reference,
          payment_type_id: mockWebhookData.payment_type,
        }),
      });

      expect(MetricsService.incrementPaymentProcessed).toHaveBeenCalledWith(
        mockWebhookData.payment_type,
      );
      expect(MetricsService.recordPaymentAmount).toHaveBeenCalledWith(
        mockWebhookData.amount,
        mockWebhookData.payment_type,
      );
      expect(MetricsService.observePaymentProcessingDuration).toHaveBeenCalled();
    });

    it('deve lidar com erros no processamento do webhook', async () => {
      const error = new Error('Erro no banco de dados');
      jest.spyOn(prisma.payment, 'create').mockRejectedValue(error);

      await expect(service.processWebhook(mockWebhookData)).rejects.toThrow(error);
      expect(MetricsService.recordPaymentFailure).toHaveBeenCalledWith(
        mockWebhookData.payment_type,
      );
    });

    it('deve validar o formato dos dados do webhook', async () => {
      const invalidWebhookData = {
        ...mockWebhookData,
        amount: 'invalid',
      };

      await expect(service.processWebhook(invalidWebhookData as any)).rejects.toThrow();
    });
  });

  describe('refundPayment', () => {
    const paymentId = '123';
    const refundAmount = 50.0;

    beforeEach(() => {
      jest.spyOn(cacheService, 'get').mockResolvedValue(mockPaymentData);
    });

    it('deve processar reembolso com sucesso', async () => {
      jest.spyOn(prisma.payment, 'update').mockResolvedValue({
        ...mockPaymentData,
        status: 'refunded',
      });

      await service.refundPayment(paymentId, refundAmount);

      expect(cacheService.get).toHaveBeenCalledWith(`payment:${paymentId}`);
      expect(prisma.payment.update).toHaveBeenCalledWith({
        where: { id: paymentId },
        data: { status: 'refunded' },
      });
      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: mockPaymentData.external_reference },
        data: { status: 'refunded' },
      });
      expect(cacheService.del).toHaveBeenCalledWith(`payment:${paymentId}`);
      expect(MetricsService.incrementPaymentRefunded).toHaveBeenCalledWith(
        mockPaymentData.payment_type_id,
        'user_request',
      );
    });

    it('deve rejeitar reembolso para pagamento não encontrado', async () => {
      jest.spyOn(cacheService, 'get').mockResolvedValue(null);

      await expect(service.refundPayment(paymentId, refundAmount)).rejects.toThrow(
        'Pagamento não encontrado',
      );
    });

    it('deve rejeitar reembolso para pagamento não aprovado', async () => {
      jest.spyOn(cacheService, 'get').mockResolvedValue({
        ...mockPaymentData,
        status: 'pending',
      });

      await expect(service.refundPayment(paymentId, refundAmount)).rejects.toThrow(
        'Pagamento não está aprovado',
      );
    });

    it('deve rejeitar reembolso para pagamento já reembolsado', async () => {
      jest.spyOn(cacheService, 'get').mockResolvedValue({
        ...mockPaymentData,
        status: 'refunded',
      });

      await expect(service.refundPayment(paymentId, refundAmount)).rejects.toThrow(
        'Pagamento já foi reembolsado',
      );
    });

    it('deve rejeitar reembolso com valor maior que o pagamento', async () => {
      const invalidAmount = 150.0;

      await expect(service.refundPayment(paymentId, invalidAmount)).rejects.toThrow(
        'Valor do reembolso maior que o valor do pagamento',
      );
    });

    it('deve lidar com erros durante o processamento do reembolso', async () => {
      const error = new Error('Erro no banco de dados');
      jest.spyOn(prisma.payment, 'update').mockRejectedValue(error);

      await expect(service.refundPayment(paymentId, refundAmount)).rejects.toThrow(error);
      expect(MetricsService.recordPaymentFailure).toHaveBeenCalledWith('refund');
    });
  });
});
