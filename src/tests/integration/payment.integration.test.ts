import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { PaymentService } from '../../modules/payment/services/payment.service';
import { AppError } from '../../utils/AppError';
import { ERROR_CODES } from '../../constants/errorMessages';
import { HttpStatusCode } from '../../constants/httpCodes';
import { createTestUser, createTestOrder } from '../helpers/testData';
import { mockPrisma } from '../mocks/prisma.mock';
import { PaymentType } from '@prisma/client';

// Mock do MercadoPago
const mockMercadoPago = {
  preferences: {
    create: vi.fn(),
  },
  payment: {
    findById: vi.fn(),
    refund: vi.fn(),
  },
};

vi.mock('mercadopago', () => ({
  default: mockMercadoPago,
}));

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrisma),
}));

describe('Payment Integration Tests', () => {
  let paymentService: PaymentService;
  let prisma: PrismaClient;
  let testUser: any;
  let testOrder: any;

  beforeEach(async () => {
    prisma = container.resolve(PrismaClient);
    paymentService = container.resolve(PaymentService);

    // Criar usuário e pedido de teste
    testUser = await createTestUser(prisma);
    testOrder = await createTestOrder(prisma, testUser.id);
  });

  afterEach(async () => {
    await prisma.pedido.deleteMany();
    await prisma.usuario.deleteMany();
    vi.clearAllMocks();
  });

  describe('criarPreferenciaCheckoutPro', () => {
    it('deve criar uma preferência de pagamento com sucesso', async () => {
      // Mock da resposta do Mercado Pago
      const mockPreference = {
        body: {
          id: 'test-preference-id',
          init_point: 'https://test-init-point.com',
        },
      };
      mockMercadoPago.preferences.create.mockResolvedValue(mockPreference);

      const result = await paymentService.criarPreferenciaCheckoutPro({
        pedidoId: testOrder.id,
        valor: 100.0,
        descricao: 'Teste de pagamento',
        tipoPagamento: PaymentType.CREDIT_CARD,
        comprador: {
          nome: testUser.nome,
          email: testUser.email,
          cpf: testUser.cpf,
        },
      });

      expect(result).toEqual({
        id: 'test-preference-id',
        init_point: 'https://test-init-point.com',
      });

      // Verificar se o pedido foi atualizado
      const updatedOrder = await prisma.pedido.findUnique({
        where: { id: testOrder.id },
      });
      expect(updatedOrder?.paymentId).toBe('test-preference-id');
      expect(updatedOrder?.status).toBe('PENDING');
      expect(updatedOrder?.pagamento).toBe(PaymentType.CREDIT_CARD);
    });

    it('deve lançar erro quando o pedido não existe', async () => {
      await expect(
        paymentService.criarPreferenciaCheckoutPro({
          pedidoId: 'non-existent-id',
          valor: 100.0,
          descricao: 'Teste de pagamento',
          tipoPagamento: PaymentType.CREDIT_CARD,
        }),
      ).rejects.toThrow(
        new AppError(ERROR_CODES.NOT_FOUND, HttpStatusCode.NOT_FOUND, {
          message: 'Pedido não encontrado',
        }),
      );
    });

    it('deve criar preferência com configurações específicas para PIX', async () => {
      const mockPreference = {
        body: {
          id: 'test-preference-id',
          init_point: 'https://test-init-point.com',
        },
      };
      mockMercadoPago.preferences.create.mockResolvedValue(mockPreference);

      await paymentService.criarPreferenciaCheckoutPro({
        pedidoId: testOrder.id,
        valor: 100.0,
        descricao: 'Teste de pagamento',
        tipoPagamento: PaymentType.PIX,
      });

      expect(mockMercadoPago.preferences.create).toHaveBeenCalledWith(
        expect.objectContaining({
          payment_methods: {
            excluded_payment_types: [{ id: 'credit_card' }, { id: 'ticket' }],
          },
        }),
      );
    });

    it('deve criar preferência com configurações específicas para boleto', async () => {
      const mockPreference = {
        body: {
          id: 'test-preference-id',
          init_point: 'https://test-init-point.com',
        },
      };
      mockMercadoPago.preferences.create.mockResolvedValue(mockPreference);

      await paymentService.criarPreferenciaCheckoutPro({
        pedidoId: testOrder.id,
        valor: 100.0,
        descricao: 'Teste de pagamento',
        tipoPagamento: PaymentType.BANK_SLIP,
      });

      expect(mockMercadoPago.preferences.create).toHaveBeenCalledWith(
        expect.objectContaining({
          payment_methods: {
            excluded_payment_types: [{ id: 'credit_card' }, { id: 'pix' }],
          },
        }),
      );
    });
  });

  describe('processarWebhook', () => {
    it('deve processar webhook de pagamento aprovado com sucesso', async () => {
      const mockPayment = {
        body: {
          id: 'test-payment-id',
          status: 'approved',
          external_reference: testOrder.id,
          payment_method_id: 'visa',
          payment_type_id: 'credit_card',
          transaction_amount: 100.0,
          installments: 3,
        },
      };
      mockMercadoPago.payment.findById.mockResolvedValue(mockPayment);

      await paymentService.processarWebhook({
        action: 'payment.created',
        data: { id: 'test-payment-id' },
      });

      const updatedOrder = await prisma.pedido.findUnique({
        where: { id: testOrder.id },
      });

      expect(updatedOrder?.status).toBe('PAID');
      expect(updatedOrder?.paymentStatus).toBe('approved');
      expect(updatedOrder?.paymentMethod).toBe('visa');
      expect(updatedOrder?.paymentType).toBe('credit_card');
      expect(updatedOrder?.installments).toBe(3);
      expect(updatedOrder?.transactionAmount).toBe(100.0);
    });

    it('deve processar webhook de pagamento pendente', async () => {
      const mockPayment = {
        body: {
          id: 'test-payment-id',
          status: 'pending',
          external_reference: testOrder.id,
        },
      };
      mockMercadoPago.payment.findById.mockResolvedValue(mockPayment);

      await paymentService.processarWebhook({
        action: 'payment.created',
        data: { id: 'test-payment-id' },
      });

      const updatedOrder = await prisma.pedido.findUnique({
        where: { id: testOrder.id },
      });

      expect(updatedOrder?.status).toBe('PENDING');
      expect(updatedOrder?.paymentStatus).toBe('pending');
    });

    it('deve processar webhook de pagamento rejeitado', async () => {
      const mockPayment = {
        body: {
          id: 'test-payment-id',
          status: 'rejected',
          external_reference: testOrder.id,
        },
      };
      mockMercadoPago.payment.findById.mockResolvedValue(mockPayment);

      await paymentService.processarWebhook({
        action: 'payment.created',
        data: { id: 'test-payment-id' },
      });

      const updatedOrder = await prisma.pedido.findUnique({
        where: { id: testOrder.id },
      });

      expect(updatedOrder?.status).toBe('CANCELLED');
      expect(updatedOrder?.paymentStatus).toBe('rejected');
    });
  });

  describe('consultarPagamento', () => {
    it('deve consultar pagamento com sucesso', async () => {
      const mockPayment = {
        body: {
          id: 'test-payment-id',
          status: 'approved',
          external_reference: testOrder.id,
        },
      };
      mockMercadoPago.payment.findById.mockResolvedValue(mockPayment);

      const result = await paymentService.consultarPagamento('test-payment-id');

      expect(result).toEqual(mockPayment.body);
      expect(mockMercadoPago.payment.findById).toHaveBeenCalledWith('test-payment-id');
    });

    it('deve lançar erro quando o pagamento não existe', async () => {
      mockMercadoPago.payment.findById.mockRejectedValue(new Error('Payment not found'));

      await expect(paymentService.consultarPagamento('non-existent-payment')).rejects.toThrow(
        new AppError(ERROR_CODES.PAYMENT_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR, {
          message: 'Erro ao consultar pagamento',
        }),
      );
    });
  });

  describe('reembolsarPagamento', () => {
    it('deve reembolsar pagamento com sucesso', async () => {
      mockMercadoPago.payment.refund.mockResolvedValue({});

      await paymentService.reembolsarPagamento('test-payment-id');

      expect(mockMercadoPago.payment.refund).toHaveBeenCalledWith('test-payment-id', undefined);
    });

    it('deve reembolsar valor específico com sucesso', async () => {
      mockMercadoPago.payment.refund.mockResolvedValue({});

      await paymentService.reembolsarPagamento('test-payment-id', 50.0);

      expect(mockMercadoPago.payment.refund).toHaveBeenCalledWith('test-payment-id', {
        amount: 50.0,
      });
    });

    it('deve lançar erro quando o reembolso falha', async () => {
      mockMercadoPago.payment.refund.mockRejectedValue(new Error('Refund failed'));

      await expect(paymentService.reembolsarPagamento('test-payment-id')).rejects.toThrow(
        new AppError(ERROR_CODES.PAYMENT_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR, {
          message: 'Erro ao reembolsar pagamento',
        }),
      );
    });
  });
});
