import { register, Counter, Histogram, Gauge } from 'prom-client';
import { Request, Response } from 'express';

// Inicializar o registro do Prometheus
register.setDefaultLabels({
  app: 'onlywave',
  environment: process.env.NODE_ENV || 'development',
});

// Contadores
export const httpRequestTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP',
  labelNames: ['method', 'path', 'status'],
});

export const paymentTotal = new Counter({
  name: 'payment_total',
  help: 'Total de pagamentos processados',
  labelNames: ['status', 'type'],
});

export const webhookTotal = new Counter({
  name: 'webhook_total',
  help: 'Total de webhooks recebidos',
  labelNames: ['status', 'type'],
});

export const refundTotal = new Counter({
  name: 'refund_total',
  help: 'Total de reembolsos processados',
  labelNames: ['status'],
});

// Histogramas
export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP em segundos',
  labelNames: ['method', 'path'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

export const paymentProcessingDuration = new Histogram({
  name: 'payment_processing_duration_seconds',
  help: 'Duração do processamento de pagamentos em segundos',
  labelNames: ['type'],
  buckets: [0.5, 1, 2, 5, 10, 30, 60],
});

export const webhookProcessingDuration = new Histogram({
  name: 'webhook_processing_duration_seconds',
  help: 'Duração do processamento de webhooks em segundos',
  labelNames: ['type'],
  buckets: [0.5, 1, 2, 5, 10, 30, 60],
});

// Gauges
export const activeUsers = new Gauge({
  name: 'active_users',
  help: 'Número de usuários ativos',
});

export const paymentQueueSize = new Gauge({
  name: 'payment_queue_size',
  help: 'Tamanho da fila de pagamentos',
});

export const webhookQueueSize = new Gauge({
  name: 'webhook_queue_size',
  help: 'Tamanho da fila de webhooks',
});

// Middleware para coletar métricas de requisições HTTP
export const httpMetricsMiddleware = (req: Request, res: Response, next: Function) => {
  const start = Date.now();

  // Registrar métricas após a resposta
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const { method, path } = req;
    const status = res.statusCode;

    httpRequestTotal.inc({ method, path, status });
    httpRequestDuration.observe({ method, path }, duration);
  });

  next();
};

// Rota para expor métricas
export const metricsRoute = async (req: Request, res: Response) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    res.status(500).end(error);
  }
};
