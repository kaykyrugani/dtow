import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaClient } from '@prisma/client';
import { WebhookDTO, PaymentStatus, WebhookData } from './dtos/payment.dto';

describe('Payment Integration Tests', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  const mockWebhookData: WebhookDTO = {
    action: 'payment.created',
    data: {
      id: '123',
      amount: '100.00',
      external_reference: 'ORDER-123',
    } as WebhookData,
    paymentType: 'credit_card',
    timestamp: Date.now(),
    status: 'approved' as PaymentStatus,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = new PrismaClient();
    await app.init();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    // Limpar dados de teste antes de cada teste
    await prisma.payment.deleteMany();
    await prisma.pedido.deleteMany();
  });

  describe('POST /payment/webhook', () => {
    it('should process webhook successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/payment/webhook')
        .send(mockWebhookData)
        .expect(201);

      expect(response.body).toHaveProperty('id', mockWebhookData.data.id);
      expect(response.body).toHaveProperty('status', mockWebhookData.status);

      // Verificar se o pagamento foi salvo no banco
      const savedPayment = await prisma.payment.findUnique({
        where: { id: mockWebhookData.data.id },
      });
      expect(savedPayment).toBeDefined();
      expect(savedPayment?.status).toBe(mockWebhookData.status);
    });

    it('should handle invalid webhook data', async () => {
      const invalidData = {
        action: 'payment.created',
        data: { id: '123' },
      };

      await request(app.getHttpServer()).post('/payment/webhook').send(invalidData).expect(400);
    });
  });

  describe('POST /payment/refund/:id', () => {
    it('should process refund successfully', async () => {
      // Primeiro criar um pagamento
      await prisma.payment.create({
        data: {
          id: '123',
          amount: '100.00',
          paymentType: 'credit_card',
          status: 'approved',
          externalReference: 'ORDER-123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .post('/payment/refund/123')
        .send({ amount: '50.00' })
        .expect(200);

      expect(response.body).toHaveProperty('status', 'refunded');

      // Verificar se o pagamento foi atualizado no banco
      const updatedPayment = await prisma.payment.findUnique({
        where: { id: '123' },
      });
      expect(updatedPayment?.status).toBe('refunded');
    });

    it('should handle refund of non-existent payment', async () => {
      await request(app.getHttpServer())
        .post('/payment/refund/999')
        .send({ amount: '50.00' })
        .expect(404);
    });
  });
});
