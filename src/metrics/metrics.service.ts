import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Counter, Gauge, Histogram, Registry } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry: Registry;
  private readonly httpRequestCounter: Counter;
  private readonly httpRequestDuration: Histogram;
  private readonly httpRequestTotal: Counter;
  private readonly httpRequestErrors: Counter;
  private readonly paymentTotal: Counter;
  private readonly paymentAmount: Gauge;
  private readonly refundTotal: Counter;
  private readonly refundAmount: Gauge;
  private readonly errorTotal: Counter;
  private readonly logger = new Logger(MetricsService.name);
  private readonly metricsEnabled: boolean;

  constructor(private readonly configService: ConfigService) {
    this.registry = new Registry();

    this.httpRequestCounter = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'path', 'status'],
      buckets: [0.1, 0.5, 1, 2, 5],
      registers: [this.registry],
    });

    this.httpRequestTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'path', 'status'],
    });

    this.httpRequestErrors = new Counter({
      name: 'http_request_errors_total',
      help: 'Total number of HTTP request errors',
      labelNames: ['method', 'route', 'status_code'],
    });

    this.paymentTotal = new Counter({
      name: 'payment_total',
      help: 'Total number of payments processed',
    });

    this.paymentAmount = new Gauge({
      name: 'payment_amount',
      help: 'Total amount of payments processed',
    });

    this.refundTotal = new Counter({
      name: 'refund_total',
      help: 'Total number of refunds processed',
    });

    this.refundAmount = new Gauge({
      name: 'refund_amount',
      help: 'Total amount of refunds processed',
    });

    this.errorTotal = new Counter({
      name: 'error_total',
      help: 'Total number of errors encountered',
      labelNames: ['type'],
    });

    this.metricsEnabled = this.configService.get<boolean>('metrics.enabled');
  }

  recordHttpRequest({
    method,
    route,
    statusCode,
    duration,
  }: {
    method: string;
    route: string;
    statusCode: number;
    duration: number;
  }): void {
    const labels = { method, route, status_code: statusCode.toString() };

    this.httpRequestDuration.observe(labels, duration);
    this.httpRequestTotal.inc(labels);

    if (statusCode >= 400) {
      this.httpRequestErrors.inc(labels);
    }
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }

  recordHttpMetric(method: string, path: string, status: number, duration: number): void {
    if (!this.metricsEnabled) {
      return;
    }

    this.logger.log({
      type: 'http_metric',
      method,
      path,
      status,
      duration,
      timestamp: new Date().toISOString(),
    });

    this.httpRequestDuration.labels(method, path, status.toString()).observe(duration);
    this.httpRequestTotal.labels(method, path, status.toString()).inc();
  }

  recordPayment(amount: number): void {
    this.paymentTotal.inc();
    this.paymentAmount.inc(amount);
  }

  recordRefund(amount: number): void {
    this.refundTotal.inc();
    this.refundAmount.inc(amount);
  }

  recordError(type: string): void {
    this.errorTotal.labels(type).inc();
  }
}
