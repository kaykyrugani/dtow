import 'reflect-metadata';
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Payment } from 'mercadopago';
import { PaymentService } from '../services/payment.service';
import { PrismaClient } from '@prisma/client';
import { MetricsService } from '../../../services/metrics.service';
import { AppError } from '../../../shared/errors/AppError';
import { WebhookDTO } from '../dtos/payment.dto';

// Mock do logger
const mockLogger = {
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  http: jest.fn(),
};

jest.mock('@prisma/client');
jest.mock('mercadopago');
jest.mock('../../../services/metrics.service');
jest.mock('../../../config/logger', () => mockLogger);

describe('Webhook Integration Tests', () => {
  let paymentService: PaymentService;
  let mockPrisma: jest.Mocked<PrismaClient>;
  let mockMetrics: jest.Mocked<MetricsService>;
  let mockPayment: jest.Mocked<Payment>;

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
      get: jest.fn(),
      create: jest.fn(),
      cancel: jest.fn(),
    } as unknown as jest.Mocked<Payment>;

    paymentService = new PaymentService(mockPrisma, mockMetrics, mockPayment);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('handleWebhook', () => {
    const mockPaymentId = '123456789';
    const mockOrderId = 'order_123';

    const createMockPaymentResponse = (status: string) => ({
      id: parseInt(mockPaymentId),
      status,
      external_reference: mockOrderId,
      payment_method_id: 'credit_card',
      payment_type_id: 'credit_card',
      installments: 1,
      transaction_amount: 100,
      api_response: {
        status: 200,
        headers: {},
      },
    });

    it('deve atualizar pedido como PAID quando pagamento é aprovado', async () => {
      const mockPaymentResponse = createMockPaymentResponse('approved');
      mockPayment.get.mockResolvedValue(mockPaymentResponse);
      mockPrisma.pedido.update.mockResolvedValue({
        id: mockOrderId,
        status: 'PAID',
      });

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId },
      };

      await paymentService.handleWebhook(webhookData);

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).toHaveBeenCalledWith({
        where: { id: mockOrderId },
        data: {
          status: 'PAID',
          paymentStatus: 'approved',
          paymentDetails: mockPaymentResponse,
          paymentMethod: 'credit_card',
          paymentType: 'credit_card',
          installments: 1,
          transactionAmount: 100,
        },
      });

      expect(mockLogger.info).toHaveBeenCalledWith(
        `Status do pedido ${mockOrderId} atualizado para approved`,
        expect.objectContaining({
          paymentId: mockPaymentId,
          status: 'approved',
          method: 'credit_card',
        }),
      );
    });

    it('deve atualizar pedido como PENDING quando pagamento está pendente', async () => {
      const mockPaymentResponse = createMockPaymentResponse('pending');
      mockPayment.get.mockResolvedValue(mockPaymentResponse);
      mockPrisma.pedido.update.mockResolvedValue({
        id: mockOrderId,
        status: 'PENDING',
      });

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId },
      };

      await paymentService.handleWebhook(webhookData);

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).toHaveBeenCalledWith({
        where: { id: mockOrderId },
        data: {
          status: 'PENDING',
          paymentStatus: 'pending',
          paymentDetails: mockPaymentResponse,
          paymentMethod: 'credit_card',
          paymentType: 'credit_card',
          installments: 1,
          transactionAmount: 100,
        },
      });

      expect(mockLogger.info).toHaveBeenCalledWith(
        `Status do pedido ${mockOrderId} atualizado para pending`,
        expect.objectContaining({
          paymentId: mockPaymentId,
          status: 'pending',
          method: 'credit_card',
        }),
      );
    });

    it('deve atualizar pedido como CANCELLED quando pagamento é rejeitado', async () => {
      const mockPaymentResponse = createMockPaymentResponse('rejected');
      mockPayment.get.mockResolvedValue(mockPaymentResponse);
      mockPrisma.pedido.update.mockResolvedValue({
        id: mockOrderId,
        status: 'CANCELLED',
      });

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId },
      };

      await paymentService.handleWebhook(webhookData);

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).toHaveBeenCalledWith({
        where: { id: mockOrderId },
        data: {
          status: 'CANCELLED',
          paymentStatus: 'rejected',
          paymentDetails: mockPaymentResponse,
          paymentMethod: 'credit_card',
          paymentType: 'credit_card',
          installments: 1,
          transactionAmount: 100,
        },
      });

      expect(mockLogger.info).toHaveBeenCalledWith(
        `Status do pedido ${mockOrderId} atualizado para rejected`,
        expect.objectContaining({
          paymentId: mockPaymentId,
          status: 'rejected',
          method: 'credit_card',
        }),
      );
    });

    it('deve atualizar pedido como CANCELLED quando pagamento é cancelado', async () => {
      const mockPaymentResponse = createMockPaymentResponse('cancelled');
      mockPayment.get.mockResolvedValue(mockPaymentResponse);
      mockPrisma.pedido.update.mockResolvedValue({
        id: mockOrderId,
        status: 'CANCELLED',
      });

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId },
      };

      await paymentService.handleWebhook(webhookData);

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).toHaveBeenCalledWith({
        where: { id: mockOrderId },
        data: {
          status: 'CANCELLED',
          paymentStatus: 'cancelled',
          paymentDetails: mockPaymentResponse,
          paymentMethod: 'credit_card',
          paymentType: 'credit_card',
          installments: 1,
          transactionAmount: 100,
        },
      });

      expect(mockLogger.info).toHaveBeenCalledWith(
        `Status do pedido ${mockOrderId} atualizado para cancelled`,
        expect.objectContaining({
          paymentId: mockPaymentId,
          status: 'cancelled',
          method: 'credit_card',
        }),
      );
    });

    it('deve atualizar pedido como CANCELLED quando pagamento é reembolsado', async () => {
      const mockPaymentResponse = createMockPaymentResponse('refunded');
      mockPayment.get.mockResolvedValue(mockPaymentResponse);
      mockPrisma.pedido.update.mockResolvedValue({
        id: mockOrderId,
        status: 'CANCELLED',
      });

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId },
      };

      await paymentService.handleWebhook(webhookData);

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).toHaveBeenCalledWith({
        where: { id: mockOrderId },
        data: {
          status: 'CANCELLED',
          paymentStatus: 'refunded',
          paymentDetails: mockPaymentResponse,
          paymentMethod: 'credit_card',
          paymentType: 'credit_card',
          installments: 1,
          transactionAmount: 100,
        },
      });

      expect(mockLogger.info).toHaveBeenCalledWith(
        `Status do pedido ${mockOrderId} atualizado para refunded`,
        expect.objectContaining({
          paymentId: mockPaymentId,
          status: 'refunded',
          method: 'credit_card',
        }),
      );
    });

    it('deve registrar aviso e retornar quando external_reference está ausente', async () => {
      const mockPaymentResponse = {
        ...createMockPaymentResponse('approved'),
        external_reference: undefined,
      };
      mockPayment.get.mockResolvedValue(mockPaymentResponse);

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId },
      };

      await paymentService.handleWebhook(webhookData);

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).not.toHaveBeenCalled();

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Pagamento recebido sem external_reference',
        expect.objectContaining({
          paymentId: mockPaymentId,
        }),
      );
    });

    it('deve lançar AppError quando payment.get falha com erro de API', async () => {
      const error = new Error('API Error');
      mockPayment.get.mockRejectedValue(error);

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId },
      };

      await expect(paymentService.handleWebhook(webhookData)).rejects.toThrow(
        'Erro ao processar webhook',
      );

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).not.toHaveBeenCalled();

      expect(mockLogger.error).toHaveBeenCalledWith(`Erro ao processar webhook: ${error}`);
    });

    it('deve lançar AppError quando payment.get falha com timeout', async () => {
      const error = new Error('ETIMEDOUT');
      mockPayment.get.mockRejectedValue(error);

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId },
      };

      await expect(paymentService.handleWebhook(webhookData)).rejects.toThrow(
        'Erro ao processar webhook',
      );

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).not.toHaveBeenCalled();

      expect(mockLogger.error).toHaveBeenCalledWith(`Erro ao processar webhook: ${error}`);
    });

    it('deve lançar AppError quando payment.get falha com token inválido', async () => {
      const error = new Error('401 Unauthorized');
      mockPayment.get.mockRejectedValue(error);

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId },
      };

      await expect(paymentService.handleWebhook(webhookData)).rejects.toThrow(
        'Erro ao processar webhook',
      );

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).not.toHaveBeenCalled();

      expect(mockLogger.error).toHaveBeenCalledWith(`Erro ao processar webhook: ${error}`);
    });

    it('deve lançar AppError quando pedido.update falha', async () => {
      const mockPaymentResponse = createMockPaymentResponse('approved');
      mockPayment.get.mockResolvedValue(mockPaymentResponse);

      const error = new Error('Database Error');
      mockPrisma.pedido.update.mockRejectedValue(error);

      const webhookData: WebhookDTO = {
        action: 'payment.updated',
        data: { id: mockPaymentId },
      };

      await expect(paymentService.handleWebhook(webhookData)).rejects.toThrow(
        'Erro ao processar webhook',
      );

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).toHaveBeenCalled();

      expect(mockLogger.error).toHaveBeenCalledWith(`Erro ao processar webhook: ${error}`);
    });

    it('deve processar ação payment.created corretamente', async () => {
      const mockPaymentResponse = createMockPaymentResponse('pending');
      mockPayment.get.mockResolvedValue(mockPaymentResponse);
      mockPrisma.pedido.update.mockResolvedValue({
        id: mockOrderId,
        status: 'PENDING',
      });

      const webhookData: WebhookDTO = {
        action: 'payment.created',
        data: { id: mockPaymentId },
      };

      await paymentService.handleWebhook(webhookData);

      expect(mockPayment.get).toHaveBeenCalledWith({ id: mockPaymentId });
      expect(mockPrisma.pedido.update).toHaveBeenCalled();
    });

    it('deve ignorar outras ações', async () => {
      const webhookData: WebhookDTO = {
        action: 'other.action',
        data: { id: mockPaymentId },
      };

      await paymentService.handleWebhook(webhookData);

      expect(mockPayment.get).not.toHaveBeenCalled();
      expect(mockPrisma.pedido.update).not.toHaveBeenCalled();
    });
  });
});
