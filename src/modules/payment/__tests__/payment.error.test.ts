import 'reflect-metadata';
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Payment, Preference } from 'mercadopago';
import { PaymentService } from '../services/payment.service';
import { PrismaClient } from '@prisma/client';
import { MetricsService } from '../../../services/metrics.service';
import { AppError } from '../../../shared/errors/AppError';
import { PaymentPreferenceDTO, WebhookDTO, RefundDTO } from '../dtos/payment.dto';

// Mock do logger
const mockLogger = {
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  http: jest.fn()
};

jest.mock('@prisma/client');
jest.mock('mercadopago');
jest.mock('../../../services/metrics.service');
jest.mock('../../../config/logger', () => mockLogger);

describe('Payment Error Handling Tests', () => {
  let paymentService: PaymentService;
  let mockPrisma: jest.Mocked<PrismaClient>;
  let mockMetrics: jest.Mocked<MetricsService>;
  let mockPayment: jest.Mocked<Payment>;
  let mockLogger: { info: jest.Mock; error: jest.Mock; warn: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();

    mockPrisma = {
      pedido: {
        update: jest.fn(),
        findUnique: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaClient>;

    mockMetrics = {
      observe: jest.fn(),
    } as unknown as jest.Mocked<MetricsService>;

    mockPayment = {
      preferences: {
        create: jest.fn(),
      },
      create: jest.fn(),
      get: jest.fn(),
      cancel: jest.fn(),
    } as unknown as jest.Mocked<Payment>;

    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    };

    paymentService = new PaymentService(mockPrisma, mockMetrics, mockPayment);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createPreference', () => {
    const mockPreferenceData: PaymentPreferenceDTO = {
      pedidoId: 'order_123',
      descricao: 'Test Product',
      valor: 100,
      formaPagamento: 'credit_card',
      comprador: {
        nome: 'Test User',
        email: 'test@example.com',
        cpf: '12345678900'
      }
    };

    it('should throw AppError when order is not found', async () => {
      mockPrisma.pedido.findUnique.mockResolvedValue(null);

      await expect(paymentService.createPreference(mockPreferenceData))
        .rejects.toThrow('Pedido não encontrado');

      expect(mockPrisma.pedido.findUnique).toHaveBeenCalledWith({
        where: { id: mockPreferenceData.pedidoId },
      });
      expect(mockPayment.create).not.toHaveBeenCalled();
      expect(mockPrisma.pedido.update).not.toHaveBeenCalled();
    });

    it('should throw AppError when MercadoPago API returns invalid response', async () => {
      mockPrisma.pedido.findUnique.mockResolvedValue({ id: 'order_123' });
      mockPayment.create.mockResolvedValue({ id: '123456789' } as unknown as Preference);

      await expect(paymentService.createPreference(mockPreferenceData))
        .rejects.toThrow('Erro ao criar preferência de pagamento');

      expect(mockPrisma.pedido.findUnique).toHaveBeenCalledWith({
        where: { id: mockPreferenceData.pedidoId },
      });
      expect(mockPayment.create).toHaveBeenCalled();
      expect(mockPrisma.pedido.update).not.toHaveBeenCalled();
    });

    it('should throw AppError when MercadoPago API throws error', async () => {
      mockPrisma.pedido.findUnique.mockResolvedValue({ id: 'order_123' });
      const error = new Error('API Error');
      mockPayment.create.mockRejectedValue(error);

      await expect(paymentService.createPreference(mockPreferenceData))
        .rejects.toThrow('Erro ao criar preferência de pagamento');

      expect(mockPrisma.pedido.findUnique).toHaveBeenCalledWith({
        where: { id: mockPreferenceData.pedidoId },
      });
      expect(mockPayment.create).toHaveBeenCalled();
      expect(mockPrisma.pedido.update).not.toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Erro ao criar preferência de pagamento:',
        expect.objectContaining({
          error,
          pedidoId: mockPreferenceData.pedidoId
        })
      );
    });

    it('should throw AppError when database update fails', async () => {
      mockPrisma.pedido.findUnique.mockResolvedValue({ id: 'order_123' });
      mockPayment.create.mockResolvedValue({
        id: '123456789',
        init_point: 'https://example.com/checkout',
        items: [],
        api_response: {
          status: 200,
          headers: {}
        }
      } as unknown as Preference);
      
      const error = new Error('Database Error');
      mockPrisma.pedido.update.mockRejectedValue(error);

      await expect(paymentService.createPreference(mockPreferenceData))
        .rejects.toThrow('Erro ao criar preferência de pagamento');

      expect(mockPrisma.pedido.findUnique).toHaveBeenCalledWith({
        where: { id: mockPreferenceData.pedidoId },
      });
      expect(mockPayment.create).toHaveBeenCalled();
      expect(mockPrisma.pedido.update).toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Erro ao criar preferência de pagamento:',
        expect.objectContaining({
          error,
          pedidoId: mockPreferenceData.pedidoId
        })
      );
    });
  });

  describe('handleWebhook', () => {
    const mockPaymentId = '123456789';
    const mockOrderId = 'order_123';

    const mockPaymentResponse = {
      id: parseInt(mockPaymentId),
      status: 'approved',
      external_reference: mockOrderId,
      payment_method_id: 'credit_card',
      payment_type_id: 'credit_card',
      installments: 1,
      transaction_amount: 100,
      api_response: {
        status: 200,
        headers: {}
      }
    };

    it('should throw AppError when payment.get fails with API error', async () => {
      const error = new Error('API Error');
      mockPayment.get.mockRejectedValue(error);

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId }
      };

      await expect(paymentService.handleWebhook(webhookData))
        .rejects.toThrow('Erro ao processar webhook');

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).not.toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Erro ao processar webhook: ${error}`
      );
    });

    it('should throw AppError when payment.get fails with timeout', async () => {
      const error = new Error('ETIMEDOUT');
      mockPayment.get.mockRejectedValue(error);

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId }
      };

      await expect(paymentService.handleWebhook(webhookData))
        .rejects.toThrow('Erro ao processar webhook');

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).not.toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Erro ao processar webhook: ${error}`
      );
    });

    it('should throw AppError when payment.get fails with invalid token', async () => {
      const error = new Error('401 Unauthorized');
      mockPayment.get.mockRejectedValue(error);

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId }
      };

      await expect(paymentService.handleWebhook(webhookData))
        .rejects.toThrow('Erro ao processar webhook');

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).not.toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Erro ao processar webhook: ${error}`
      );
    });

    it('should throw AppError when pedido.update fails', async () => {
      mockPayment.get.mockResolvedValue(mockPaymentResponse);
      
      const error = new Error('Database Error');
      mockPrisma.pedido.update.mockRejectedValue(error);

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId }
      };

      await expect(paymentService.handleWebhook(webhookData))
        .rejects.toThrow('Erro ao processar webhook');

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Erro ao processar webhook: ${error}`
      );
    });
  });

  describe('reembolsarPagamento', () => {
    const mockPaymentId = '123456789';
    const mockAmount = 100;

    it('should throw AppError when payment.cancel fails with API error', async () => {
      const error = new Error('API Error');
      mockPayment.cancel.mockRejectedValue(error);

      await expect(paymentService.reembolsarPagamento(mockPaymentId, mockAmount))
        .rejects.toThrow('Erro ao reembolsar pagamento');

      expect(mockPayment.cancel).toHaveBeenCalledWith(mockPaymentId);
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Erro ao reembolsar pagamento: ${error}`
      );
    });

    it('should throw AppError when payment.cancel fails with timeout', async () => {
      const error = new Error('ETIMEDOUT');
      mockPayment.cancel.mockRejectedValue(error);

      await expect(paymentService.reembolsarPagamento(mockPaymentId, mockAmount))
        .rejects.toThrow('Erro ao reembolsar pagamento');

      expect(mockPayment.cancel).toHaveBeenCalledWith(mockPaymentId);
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Erro ao reembolsar pagamento: ${error}`
      );
    });

    it('should throw AppError when payment.cancel fails with invalid token', async () => {
      const error = new Error('401 Unauthorized');
      mockPayment.cancel.mockRejectedValue(error);

      await expect(paymentService.reembolsarPagamento(mockPaymentId, mockAmount))
        .rejects.toThrow('Erro ao reembolsar pagamento');

      expect(mockPayment.cancel).toHaveBeenCalledWith(mockPaymentId);
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Erro ao reembolsar pagamento: ${error}`
      );
    });

    it('should throw AppError when payment.cancel fails with payment not found', async () => {
      const error = new Error('404 Not Found');
      mockPayment.cancel.mockRejectedValue(error);

      await expect(paymentService.reembolsarPagamento(mockPaymentId, mockAmount))
        .rejects.toThrow('Erro ao reembolsar pagamento');

      expect(mockPayment.cancel).toHaveBeenCalledWith(mockPaymentId);
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Erro ao reembolsar pagamento: ${error}`
      );
    });
  });
}); 