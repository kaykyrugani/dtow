import { container } from 'tsyringe';
import { AlertService } from './AlertService';
import { Counter, Gauge, Histogram } from 'prom-client';

export class MetricsService {
  private static instance: MetricsService;
  private metrics: Map<string, number> = new Map();
  private alertService: AlertService;

  // Métricas de Pagamento
  private static paymentSuccessCounter = new Counter({
    name: 'onlywave_payment_success_total',
    help: 'Total de pagamentos com status "approved"',
    labelNames: ['payment_type', 'amount']
  });

  private static paymentFailureCounter = new Counter({
    name: 'onlywave_payment_failure_total',
    help: 'Total de falhas de pagamento',
    labelNames: ['error_type', 'payment_type']
  });

  private static paymentConversionGauge = new Gauge({
    name: 'onlywave_payment_conversion_rate',
    help: 'Razão entre preferências criadas e pagamentos aprovados',
    labelNames: ['payment_type']
  });

  // Métricas de Webhook
  private static webhookProcessingDuration = new Histogram({
    name: 'onlywave_webhook_processing_duration_seconds',
    help: 'Tempo de processamento de webhooks',
    labelNames: ['payment_id', 'status'],
    buckets: [0.1, 0.5, 1, 2, 5, 10]
  });

  private static webhookRetryCounter = new Counter({
    name: 'onlywave_webhook_retry_total',
    help: 'Total de tentativas de retry por paymentId',
    labelNames: ['payment_id', 'attempt']
  });

  private static webhookFailuresCounter = new Counter({
    name: 'onlywave_webhook_failures_total',
    help: 'Total de webhooks com status >= 400',
    labelNames: ['payment_id', 'status_code']
  });

  private static webhookQueueSizeGauge = new Gauge({
    name: 'onlywave_webhook_queue_size',
    help: 'Tamanho da fila de webhooks pendentes'
  });

  // Métricas de Reprocessamento
  private static retryBackoffCounter = new Counter({
    name: 'onlywave_retry_backoff_total',
    help: 'Retentativas feitas em cada nível de backoff',
    labelNames: ['level', 'operation']
  });

  private static retryIntervalHistogram = new Histogram({
    name: 'onlywave_retry_interval_seconds',
    help: 'Tempo entre tentativas de retry',
    labelNames: ['operation'],
    buckets: [1, 5, 10, 30, 60, 120, 300]
  });

  private static dlqWebhooksCounter = new Counter({
    name: 'onlywave_dlq_webhooks_total',
    help: 'Webhooks enviados para dead-letter queue',
    labelNames: ['payment_id', 'reason']
  });

  // Métricas de Segurança
  private static authFailuresCounter = new Counter({
    name: 'onlywave_auth_failures_total',
    help: 'Total de falhas de autenticação',
    labelNames: ['reason', 'country', 'ip']
  });

  private static tokenInvalidCounter = new Counter({
    name: 'onlywave_token_invalid_total',
    help: 'Tokens inválidos recebidos',
    labelNames: ['reason']
  });

  private static authAttemptsByIpCounter = new Counter({
    name: 'onlywave_auth_attempts_by_ip',
    help: 'Tentativas de autenticação por IP',
    labelNames: ['ip', 'status', 'country']
  });

  private static unauthorizedRequestsCounter = new Counter({
    name: 'onlywave_unauthorized_requests_total',
    help: 'Total de requisições não autorizadas',
    labelNames: ['endpoint', 'ip', 'country']
  });

  // Métricas de Tendência
  private static weeklyErrorTrendGauge = new Gauge({
    name: 'onlywave_weekly_error_trend',
    help: 'Tendência semanal de erros',
    labelNames: ['error_type']
  });

  private static weeklyPaymentTrendGauge = new Gauge({
    name: 'onlywave_weekly_payment_trend',
    help: 'Tendência semanal de pagamentos',
    labelNames: ['status']
  });

  private constructor() {
    this.alertService = container.resolve(AlertService);
  }

  public static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }

  // Métodos para Pagamentos
  public static recordPaymentSuccess(paymentType: string, amount: number): void {
    this.paymentSuccessCounter.inc({ payment_type: paymentType, amount: amount.toString() });
  }

  public static recordPaymentFailure(errorType: string, paymentType: string): void {
    this.paymentFailureCounter.inc({ error_type: errorType, payment_type: paymentType });
  }

  public static updatePaymentConversionRate(paymentType: string, rate: number): void {
    this.paymentConversionGauge.set({ payment_type: paymentType }, rate);
  }

  // Métodos para Webhooks
  public static recordWebhookProcessingDuration(paymentId: string, status: string, duration: number): void {
    this.webhookProcessingDuration.observe({ payment_id: paymentId, status }, duration);
  }

  public static incrementWebhookRetry(paymentId: string, attempt: number): void {
    this.webhookRetryCounter.inc({ payment_id: paymentId, attempt: attempt.toString() });
  }

  public static recordWebhookFailure(paymentId: string, statusCode: number): void {
    this.webhookFailuresCounter.inc({ payment_id: paymentId, status_code: statusCode.toString() });
  }

  public static updateWebhookQueueSize(size: number): void {
    this.webhookQueueSizeGauge.set(size);
  }

  // Métodos para Reprocessamento
  public static recordRetryBackoff(level: number, operation: string): void {
    this.retryBackoffCounter.inc({ level: level.toString(), operation });
  }

  public static recordRetryInterval(operation: string, interval: number): void {
    this.retryIntervalHistogram.observe({ operation }, interval);
  }

  public static recordDlqWebhook(paymentId: string, reason: string): void {
    this.dlqWebhooksCounter.inc({ payment_id: paymentId, reason });
  }

  // Métodos para Segurança
  public static recordAuthFailure(reason: string, country: string, ip: string): void {
    this.authFailuresCounter.inc({ reason, country, ip });
  }

  public static recordInvalidToken(reason: string): void {
    this.tokenInvalidCounter.inc({ reason });
  }

  public static recordAuthAttempt(ip: string, status: string, country: string): void {
    this.authAttemptsByIpCounter.inc({ ip, status, country });
  }

  public static recordUnauthorizedRequest(endpoint: string, ip: string, country: string): void {
    this.unauthorizedRequestsCounter.inc({ endpoint, ip, country });
  }

  // Métodos para Tendências
  public static updateWeeklyErrorTrend(errorType: string, count: number): void {
    this.weeklyErrorTrendGauge.set({ error_type: errorType }, count);
  }

  public static updateWeeklyPaymentTrend(status: string, count: number): void {
    this.weeklyPaymentTrendGauge.set({ status }, count);
  }

  // Métodos de Utilidade
  public incrementMetric(name: string, value: number = 1): void {
    const currentValue = this.metrics.get(name) || 0;
    this.metrics.set(name, currentValue + value);
    this.checkMetricThreshold(name);
  }

  public decrementMetric(name: string, value: number = 1): void {
    const currentValue = this.metrics.get(name) || 0;
    this.metrics.set(name, Math.max(0, currentValue - value));
    this.checkMetricThreshold(name);
  }

  public setMetric(name: string, value: number): void {
    this.metrics.set(name, value);
    this.checkMetricThreshold(name);
  }

  public getMetric(name: string): number {
    return this.metrics.get(name) || 0;
  }

  private async checkMetricThreshold(name: string): Promise<void> {
    const value = this.metrics.get(name) || 0;
    await this.alertService.checkAlert(name, value);
  }

  public static incrementAlertCount(severity: string): void {
    MetricsService.getInstance().incrementMetric(`alert_count_${severity}`);
  }

  public static incrementErrorCount(type: string): void {
    MetricsService.getInstance().incrementMetric(`error_count_${type}`);
  }

  public static incrementRequestCount(): void {
    MetricsService.getInstance().incrementMetric('request_count');
  }

  public static incrementResponseTime(time: number): void {
    MetricsService.getInstance().incrementMetric('total_response_time', time);
    MetricsService.getInstance().incrementMetric('request_count');
  }
} 