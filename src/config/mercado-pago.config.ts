import { ConfigService } from '@nestjs/config';

export const MercadoPagoConfig = {
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || 'TEST-ACCESS-TOKEN',
  publicKey: process.env.MERCADO_PAGO_PUBLIC_KEY || 'TEST-PUBLIC-KEY',
  webhookSecret: process.env.MERCADO_PAGO_WEBHOOK_SECRET || 'TEST-WEBHOOK-SECRET',
  baseUrl: process.env.MERCADO_PAGO_API_URL || 'https://api.mercadopago.com',
  version: 'v1',
  timeout: 5000,
  retries: 3,
  retryDelay: 1000,
};
