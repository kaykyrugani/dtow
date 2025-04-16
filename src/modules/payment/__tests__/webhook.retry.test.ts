import { PaymentService } from '../services/payment.service';
import { PrismaClient } from '@prisma/client';
import { MetricsService } from '../../../services/metrics.service';
import { AppError } from '../../../utils/AppError';

jest.mock('@prisma/client');
jest.mock('../../../services/metrics.service');
jest.mock('mercadopago');

describe('PaymentService - Webhook Retry Mechanism', () => {
  let paymentService: PaymentService;
  let mockPrisma: jest.Mocked<PrismaClient>;
  let mockMetrics: jest.Mocked<MetricsService>;

  beforeEach(() => {
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    mockMetrics = MetricsService.getInstance() as jest.Mocked<MetricsService>;
    paymentService = PaymentService.getInstance();
  });

  describe('Webhook Retry Logic', () => {
    it('deve tentar novamente após falha temporária', async () => {
      const webhookData = {
        action: 'payment.updated',
        data: { id: 'payment-123' }
      };

      const mockPayment = {
        id: 'payment-123',
        external_reference: 'order-123',
        status: 'approved'
      };

      // Primeira tentativa falha
      jest.spyOn(paymentService['payment'], 'get')
        .mockRejectedValueOnce(new Error('ETIMEDOUT'))
        // Segunda tentativa sucede
        .mockResolvedValueOnce({ response: mockPayment } as any);

      mockPrisma.pedido.update.mockResolvedValue({} as any);

      await expect(paymentService.handleWebhook(webhookData))
        .resolves
        .toBeDefined();

      expect(paymentService['payment'].get).toHaveBeenCalledTimes(2);
    });

    it('deve parar após número máximo de tentativas', async () => {
      const webhookData = {
        action: 'payment.updated',
        data: { id: 'payment-123' }
      };

      // Todas as tentativas falham
      jest.spyOn(paymentService['payment'], 'get')
        .mockRejectedValue(new Error('ETIMEDOUT'));

      await expect(paymentService.handleWebhook(webhookData))
        .rejects
        .toThrow(AppError);

      expect(paymentService['payment'].get).toHaveBeenCalledTimes(3);
    });

    it('deve registrar tentativas no log', async () => {
      const webhookData = {
        action: 'payment.updated',
        data: { id: 'payment-123' }
      };

      jest.spyOn(paymentService['payment'], 'get')
        .mockRejectedValue(new Error('ETIMEDOUT'));

      const consoleSpy = jest.spyOn(console, 'error');

      await expect(paymentService.handleWebhook(webhookData))
        .rejects
        .toThrow();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao processar webhook',
        expect.objectContaining({
          error: expect.any(Error),
          attempt: expect.any(Number)
        })
      );
    });

    it('deve atualizar métricas de retry', async () => {
      const webhookData = {
        action: 'payment.updated',
        data: { id: 'payment-123' }
      };

      jest.spyOn(paymentService['payment'], 'get')
        .mockRejectedValue(new Error('ETIMEDOUT'));

      await expect(paymentService.handleWebhook(webhookData))
        .rejects
        .toThrow();

      expect(mockMetrics.incrementCacheMiss).toHaveBeenCalledWith(
        'payment',
        'handle_webhook'
      );
    });
  });

  describe('Webhook Queue Processing', () => {
    it('deve processar webhooks em fila', async () => {
      const webhooks = [
        { action: 'payment.updated', data: { id: 'payment-1' } },
        { action: 'payment.updated', data: { id: 'payment-2' } },
        { action: 'payment.updated', data: { id: 'payment-3' } }
      ];

      const mockPayment = {
        id: 'payment-123',
        external_reference: 'order-123',
        status: 'approved'
      };

      jest.spyOn(paymentService['payment'], 'get')
        .mockResolvedValue({ response: mockPayment } as any);

      mockPrisma.pedido.update.mockResolvedValue({} as any);

      const results = await Promise.all(
        webhooks.map(webhook => paymentService.handleWebhook(webhook))
      );

      expect(results).toHaveLength(3);
      expect(results.every(result => result !== null)).toBe(true);
    });

    it('deve continuar processando fila mesmo se um webhook falhar', async () => {
      const webhooks = [
        { action: 'payment.updated', data: { id: 'payment-1' } },
        { action: 'payment.updated', data: { id: 'payment-2' } },
        { action: 'payment.updated', data: { id: 'payment-3' } }
      ];

      jest.spyOn(paymentService['payment'], 'get')
        .mockRejectedValueOnce(new Error('Failed'))
        .mockResolvedValue({ response: { id: 'payment-123', external_reference: 'order-123' } } as any);

      mockPrisma.pedido.update.mockResolvedValue({} as any);

      const results = await Promise.allSettled(
        webhooks.map(webhook => paymentService.handleWebhook(webhook))
      );

      expect(results).toHaveLength(3);
      expect(results[0].status).toBe('rejected');
      expect(results[1].status).toBe('fulfilled');
      expect(results[2].status).toBe('fulfilled');
    });
  });
}); 