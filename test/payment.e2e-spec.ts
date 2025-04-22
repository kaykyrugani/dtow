import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PaymentStatus } from '../src/modules/payment/interfaces/payment-status.interface';

describe('PaymentController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/payments/webhook (POST)', () => {
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

    it('deve processar um webhook com sucesso', () => {
      return request(app.getHttpServer())
        .post('/payments/webhook')
        .send(mockWebhookData)
        .expect(201)
        .expect(res => {
          expect(res.body).toHaveProperty('id', mockWebhookData.payment_id);
          expect(res.body).toHaveProperty('amount', mockWebhookData.amount);
          expect(res.body).toHaveProperty('status', PaymentStatus.COMPLETED);
        });
    });

    it('deve retornar 400 para dados inválidos', () => {
      const invalidData = {
        id: 'webhook_123',
        // payment_id faltando
        amount: 'invalid', // deve ser número
        currency: 'BRL',
        status: 'paid',
        payment_method: 'credit_card',
        customer_id: 'customer_123',
        order_id: 'order_123',
      };

      return request(app.getHttpServer()).post('/payments/webhook').send(invalidData).expect(400);
    });

    it('deve ser idempotente para webhooks duplicados', async () => {
      // Primeira chamada
      const firstResponse = await request(app.getHttpServer())
        .post('/payments/webhook')
        .send(mockWebhookData)
        .expect(201);

      // Segunda chamada com mesmo webhook_id
      const secondResponse = await request(app.getHttpServer())
        .post('/payments/webhook')
        .send(mockWebhookData)
        .expect(200);

      expect(secondResponse.body.id).toBe(firstResponse.body.id);
    });
  });

  describe('/payments/:id/refund (POST)', () => {
    it('deve reembolsar um pagamento com sucesso', async () => {
      // Primeiro criar um pagamento
      const webhookData = {
        id: 'webhook_124',
        payment_id: 'payment_124',
        amount: 1000,
        currency: 'BRL',
        status: 'paid',
        payment_method: 'credit_card',
        customer_id: 'customer_123',
        order_id: 'order_123',
      };

      await request(app.getHttpServer()).post('/payments/webhook').send(webhookData).expect(201);

      // Tentar reembolso
      return request(app.getHttpServer())
        .post(`/payments/${webhookData.payment_id}/refund`)
        .send({ amount: 500, reason: 'customer_request' })
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveProperty('id', webhookData.payment_id);
          expect(res.body).toHaveProperty('refundedAmount', 500);
          expect(res.body).toHaveProperty('status', PaymentStatus.PARTIALLY_REFUNDED);
        });
    });

    it('deve retornar 404 para pagamento inexistente', () => {
      return request(app.getHttpServer())
        .post('/payments/non_existent/refund')
        .send({ amount: 500, reason: 'customer_request' })
        .expect(404);
    });

    it('deve retornar 400 para valor maior que o pagamento', async () => {
      // Primeiro criar um pagamento
      const webhookData = {
        id: 'webhook_125',
        payment_id: 'payment_125',
        amount: 1000,
        currency: 'BRL',
        status: 'paid',
        payment_method: 'credit_card',
        customer_id: 'customer_123',
        order_id: 'order_123',
      };

      await request(app.getHttpServer()).post('/payments/webhook').send(webhookData).expect(201);

      // Tentar reembolso com valor maior
      return request(app.getHttpServer())
        .post(`/payments/${webhookData.payment_id}/refund`)
        .send({ amount: 1500, reason: 'customer_request' })
        .expect(400);
    });
  });
});
