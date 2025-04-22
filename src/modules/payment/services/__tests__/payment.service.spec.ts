import { PaymentService } from '../payment.service';
import { MetricsService } from '../../../../services/metrics.service';
import { AuditService } from '../../../../services/AuditService';
import { PrismaClient } from '@prisma/client';
import { Payment } from 'mercadopago';
import { AppError } from '../../../../utils/AppError';
import { HttpStatusCode } from '../../../../constants/httpCodes';
import { ERROR_CODES } from '../../../../constants/errorMessages';

jest.mock('@prisma/client');
jest.mock('../../../../services/metrics.service');
jest.mock('../../../../services/AuditService');
jest.mock('mercadopago');

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let mockPrisma: jest.Mocked<PrismaClient>;
  let mockMetricsService: jest.Mocked<MetricsService>;
  let mockAuditService: jest.Mocked<AuditService>;
  let mockPayment: jest.Mocked<Payment>;

  beforeEach(() => {
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    mockMetricsService = MetricsService.getInstance() as jest.Mocked<MetricsService>;
    mockAuditService = new AuditService(mockPrisma) as jest.Mocked<AuditService>;
    mockPayment = new Payment({} as any) as jest.Mocked<Payment>;

    paymentService = new PaymentService(
      mockPrisma,
      mockMetricsService,
      mockAuditService,
      mockPayment,
    );
  });

  describe('handleWebhook', () => {
    const mockWebhookData = {
      action: 'payment.created',
      data: {
        id: '123456789',
        status: 'approved',
      },
      paymentType: 'credit_card',
      timestamp: Date.now(),
      status: 'approved',
    };

    it('deve processar webhook com sucesso', async () => {
      const mockPaymentResponse = {
        id: '123456789',
        status: 'approved',
        external_reference: 'pedido123',
        payment_type_id: 'credit_card',
        transaction_amount: 100,
      };

      mockPayment.get.mockResolvedValue({ response: mockPaymentResponse });
      mockPrisma.webhookLog.findUnique.mockResolvedValue(null);
      mockPrisma.webhookLog.findFirst.mockResolvedValue(null);
      mockPrisma.pedido.update.mockResolvedValue({} as any);

      const result = await paymentService.handleWebhook(mockWebhookData);

      expect(result).toBeDefined();
      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockWebhookData.data.id });
      expect(mockPrisma.pedido.update).toHaveBeenCalled();
      expect(mockMetricsService.observeCacheOperation).toHaveBeenCalled();
    });

    it('deve ignorar webhook duplicado', async () => {
      mockPrisma.webhookLog.findUnique.mockResolvedValue({} as any);

      const result = await paymentService.handleWebhook(mockWebhookData);

      expect(result).toBeNull();
      expect(mockMetricsService.incrementWebhookIdempotencyIgnored).toHaveBeenCalled();
    });

    it('deve lançar erro quando pagamento não é encontrado', async () => {
      mockPayment.get.mockRejectedValue(new Error('Payment not found'));

      await expect(paymentService.handleWebhook(mockWebhookData)).rejects.toThrow(AppError);
      expect(mockMetricsService.incrementWebhookFailures).toHaveBeenCalled();
    });
  });

  describe('reembolsarPagamento', () => {
    const mockPaymentId = '123456789';

    it('deve processar reembolso com sucesso', async () => {
      const mockPayment = {
        id: mockPaymentId,
        status: 'approved',
        external_reference: 'pedido123',
        payment_type_id: 'credit_card',
        transaction_amount: 100,
      };

      mockPayment.get.mockResolvedValue({ response: mockPayment });
      mockPrisma.pedido.update.mockResolvedValue({} as any);

      const result = await paymentService.reembolsarPagamento(mockPaymentId);

      expect(result).toBeDefined();
      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).toHaveBeenCalled();
      expect(mockMetricsService.observeCacheOperation).toHaveBeenCalled();
    });

    it('deve lançar erro quando pagamento não é encontrado', async () => {
      mockPayment.get.mockRejectedValue(new Error('Payment not found'));

      await expect(paymentService.reembolsarPagamento(mockPaymentId)).rejects.toThrow(AppError);
      expect(mockMetricsService.incrementCacheMiss).toHaveBeenCalled();
    });

    it('deve lançar erro quando pagamento não está aprovado', async () => {
      const mockPayment = {
        id: mockPaymentId,
        status: 'pending',
        external_reference: 'pedido123',
        payment_type_id: 'credit_card',
        transaction_amount: 100,
      };

      mockPayment.get.mockResolvedValue({ response: mockPayment });

      await expect(paymentService.reembolsarPagamento(mockPaymentId)).rejects.toThrow(AppError);
    });
  });
});
