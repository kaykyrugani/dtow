import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../../src/modules/payment/services/payment.service';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig } from '../../src/config/mercado-pago.config';
import { WebhookData } from '../../src/modules/payment/interfaces/webhook-data.interface';
import { PaymentStatus } from '../../src/modules/payment/dtos/payment.dto';

describe('PaymentService Integration', () => {
  let service: PaymentService;
  let prisma: PrismaClient;
  let configService: ConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        PrismaClient,
        ConfigService,
        {
          provide: 'MERCADO_PAGO_CONFIG',
          useValue: MercadoPagoConfig
        }
      ]
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    prisma = module.get<PrismaClient>(PrismaClient);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.payment.deleteMany();
    await prisma.order.deleteMany();
  });

  describe('Webhook Processing', () => {
    it('should process webhook and create payment record', async () => {
      const webhookData: WebhookData = {
        action: 'payment.created',
        data: {
          id: 'TEST-123',
          amount: 100,
          external_reference: 'ORDER-TEST-123'
        },
        paymentType: 'credit_card',
        timestamp: Date.now(),
        status: 'approved' as PaymentStatus
      };

      const payment = await service.processWebhook(webhookData);

      expect(payment).toBeDefined();
      expect(payment.external_id).toBe(webhookData.data.id);
      expect(payment.amount).toBe(webhookData.data.amount);
      expect(payment.status).toBe(webhookData.status);

      const savedPayment = await prisma.payment.findUnique({
        where: { id: payment.id }
      });

      expect(savedPayment).toBeDefined();
      expect(savedPayment.external_id).toBe(webhookData.data.id);
    });
  });

  describe('Payment Refund', () => {
    it('should process refund and update payment status', async () => {
      // Criar um pagamento de teste
      const testPayment = await prisma.payment.create({
        data: {
          external_id: 'TEST-REFUND-123',
          amount: 100,
          status: 'approved',
          payment_type_id: 'credit_card',
          external_reference: 'ORDER-TEST-123'
        }
      });

      const refund = await service.reembolsarPagamento(
        testPayment.id,
        100,
        'test_refund'
      );

      expect(refund.status).toBe('refunded');
      expect(refund.refund_reason).toBe('test_refund');

      const updatedPayment = await prisma.payment.findUnique({
        where: { id: testPayment.id }
      });

      expect(updatedPayment.status).toBe('refunded');
      expect(updatedPayment.refund_reason).toBe('test_refund');
    });

    it('should handle partial refunds correctly', async () => {
      const testPayment = await prisma.payment.create({
        data: {
          external_id: 'TEST-PARTIAL-REFUND-123',
          amount: 100,
          status: 'approved',
          payment_type_id: 'credit_card',
          external_reference: 'ORDER-TEST-123'
        }
      });

      const refund = await service.reembolsarPagamento(
        testPayment.id,
        50,
        'partial_refund'
      );

      expect(refund.status).toBe('refunded');
      expect(refund.refund_amount).toBe(50);

      const updatedPayment = await prisma.payment.findUnique({
        where: { id: testPayment.id }
      });

      expect(updatedPayment.status).toBe('refunded');
      expect(updatedPayment.refund_amount).toBe(50);
    });
  });
}); 