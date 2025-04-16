import 'reflect-metadata';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Payment, Preference } from 'mercadopago';
import { PaymentService } from '../services/payment.service';
import { PrismaClient } from '@prisma/client';
import { MetricsService } from '../../../services/metrics.service';
import { AppError } from '../../../shared/errors/AppError';
import { RefundDTO } from '../dtos/payment.dto';

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

describe('PaymentService', () => {
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

  describe('createPreference', () => {
    const mockPreferenceData = {
      pedidoId: 'order_123',
      descricao: 'Test Product',
      valor: 100,
      formaPagamento: 'credit_card' as const,
      comprador: {
        nome: 'Test User',
        email: 'test@example.com',
        cpf: '12345678900'
      }
    };

    const mockPreferenceResponse = {
      id: '123456789',
      init_point: 'https://example.com/checkout',
      items: [
        {
          id: 'item_123',
          title: 'Test Product',
          quantity: 1,
          unit_price: 100,
          currency_id: 'BRL'
        },
      ],
      payer: {
        email: 'test@example.com',
      },
      api_response: {
        status: 200,
        headers: {},
      }
    } as unknown as Preference;

    it('should create a payment preference successfully', async () => {
      mockPayment.create.mockResolvedValue(mockPreferenceResponse);

      const result = await paymentService.createPreference(mockPreferenceData);

      expect(result).toEqual({
        id: '123456789',
        init_point: 'https://example.com/checkout',
        valorOriginal: 100,
        valorFinal: 100,
        desconto: 0
      });

      expect(mockPayment.create).toHaveBeenCalledWith({
        body: {
          items: [{
            title: mockPreferenceData.descricao,
            quantity: 1,
            unit_price: mockPreferenceData.valor,
            currency_id: "BRL"
          }],
          payer: {
            name: mockPreferenceData.comprador.nome,
            email: mockPreferenceData.comprador.email,
            identification: {
              type: 'CPF',
              number: mockPreferenceData.comprador.cpf
            }
          },
          external_reference: mockPreferenceData.pedidoId,
          payment_methods: {
            default_payment_method_id: mockPreferenceData.formaPagamento,
            installments: 12
          },
          statement_descriptor: "ONLYWAVE",
          binary_mode: true
        }
      });

      expect(mockLogger.info).toHaveBeenCalledWith(
        'Preferência de pagamento criada com sucesso',
        expect.objectContaining({
          preferenceId: '123456789',
          pedidoId: 'order_123'
        })
      );
    });

    it('should throw AppError when preference creation fails', async () => {
      const error = new Error('API Error');
      mockPayment.create.mockRejectedValue(error);

      await expect(paymentService.createPreference(mockPreferenceData))
        .rejects.toThrow(AppError);

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Erro ao criar preferência de pagamento:',
        expect.objectContaining({
          error,
          pedidoId: 'order_123'
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

    it('should update order status when payment is approved', async () => {
      mockPayment.get.mockResolvedValue(mockPaymentResponse);
      mockPrisma.pedido.update.mockResolvedValue({ 
        id: mockOrderId, 
        status: 'PAID' 
      });

      await paymentService.handleWebhook({ 
        action: 'payment.updated',
        data: { id: mockPaymentId } 
      });

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
          transactionAmount: 100
        }
      });

      expect(mockLogger.info).toHaveBeenCalledWith(
        `Status do pedido ${mockOrderId} atualizado para approved`,
        expect.objectContaining({
          paymentId: mockPaymentId,
          status: 'approved',
          method: 'credit_card'
        })
      );
    });

    it('should log warning when external_reference is missing', async () => {
      const responseWithoutRef = {
        ...mockPaymentResponse,
        external_reference: undefined
      };
      mockPayment.get.mockResolvedValue(responseWithoutRef);

      await paymentService.handleWebhook({ 
        action: 'payment.updated',
        data: { id: mockPaymentId } 
      });

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Pagamento recebido sem external_reference',
        expect.objectContaining({
          paymentId: mockPaymentId
        })
      );
    });
  });

  describe('reembolsarPagamento', () => {
    const mockPaymentId = '123456789';
    const mockAmount = 100;

    it('deve reembolsar pagamento com sucesso', async () => {
      const mockRefundResponse = {
        id: parseInt(mockPaymentId),
        status: 'refunded',
        api_response: {
          status: 200,
          headers: {}
        }
      };

      mockPayment.cancel.mockResolvedValue(mockRefundResponse);

      const result = await paymentService.reembolsarPagamento(mockPaymentId, mockAmount);

      expect(mockPayment.cancel).toHaveBeenCalledWith(mockPaymentId, { amount: mockAmount });
      expect(result).toEqual(mockRefundResponse);
      expect(mockLogger.info).toHaveBeenCalledWith(
        'Pagamento reembolsado com sucesso',
        expect.objectContaining({
          paymentId: mockPaymentId,
          amount: mockAmount
        })
      );
    });

    it('deve lançar AppError quando pagamento já está reembolsado', async () => {
      const error = new Error('Payment already refunded');
      mockPayment.cancel.mockRejectedValue(error);

      await expect(paymentService.reembolsarPagamento(mockPaymentId, mockAmount))
        .rejects.toThrow('Erro ao reembolsar pagamento');

      expect(mockPayment.cancel).toHaveBeenCalledWith(mockPaymentId, { amount: mockAmount });
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Erro ao reembolsar pagamento: ${error}`,
        expect.objectContaining({
          paymentId: mockPaymentId,
          amount: mockAmount
        })
      );
    });

    it('deve lançar AppError quando ocorre erro de autenticação', async () => {
      const error = new Error('401 Unauthorized');
      mockPayment.cancel.mockRejectedValue(error);

      await expect(paymentService.reembolsarPagamento(mockPaymentId, mockAmount))
        .rejects.toThrow('Erro ao reembolsar pagamento');

      expect(mockPayment.cancel).toHaveBeenCalledWith(mockPaymentId, { amount: mockAmount });
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Erro ao reembolsar pagamento: ${error}`,
        expect.objectContaining({
          paymentId: mockPaymentId,
          amount: mockAmount
        })
      );
    });

    it('deve lançar AppError quando ocorre timeout na API', async () => {
      const error = new Error('ETIMEDOUT');
      mockPayment.cancel.mockRejectedValue(error);

      await expect(paymentService.reembolsarPagamento(mockPaymentId, mockAmount))
        .rejects.toThrow('Erro ao reembolsar pagamento');

      expect(mockPayment.cancel).toHaveBeenCalledWith(mockPaymentId, { amount: mockAmount });
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Erro ao reembolsar pagamento: ${error}`,
        expect.objectContaining({
          paymentId: mockPaymentId,
          amount: mockAmount
        })
      );
    });

    it('deve reembolsar valor parcial do pagamento', async () => {
      const partialAmount = 50;
      const mockRefundResponse = {
        id: parseInt(mockPaymentId),
        status: 'refunded',
        api_response: {
          status: 200,
          headers: {}
        }
      };

      mockPayment.cancel.mockResolvedValue(mockRefundResponse);

      const result = await paymentService.reembolsarPagamento(mockPaymentId, partialAmount);

      expect(mockPayment.cancel).toHaveBeenCalledWith(mockPaymentId, { amount: partialAmount });
      expect(result).toEqual(mockRefundResponse);
      expect(mockLogger.info).toHaveBeenCalledWith(
        'Pagamento reembolsado com sucesso',
        expect.objectContaining({
          paymentId: mockPaymentId,
          amount: partialAmount
        })
      );
    });

    it('deve lançar AppError quando valor do reembolso é inválido', async () => {
      const invalidAmount = -100;

      await expect(paymentService.reembolsarPagamento(mockPaymentId, invalidAmount))
        .rejects.toThrow('Valor do reembolso inválido');

      expect(mockPayment.cancel).not.toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Valor do reembolso inválido',
        expect.objectContaining({
          paymentId: mockPaymentId,
          amount: invalidAmount
        })
      );
    });

    it('deve lançar AppError quando ID do pagamento é inválido', async () => {
      const invalidPaymentId = '';

      await expect(paymentService.reembolsarPagamento(invalidPaymentId, mockAmount))
        .rejects.toThrow('ID do pagamento inválido');

      expect(mockPayment.cancel).not.toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        'ID do pagamento inválido',
        expect.objectContaining({
          paymentId: invalidPaymentId,
          amount: mockAmount
        })
      );
    });
  });
});