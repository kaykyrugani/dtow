import { Request, Response, NextFunction } from 'express';
import { Registry, Counter, Histogram, Gauge } from 'prom-client';
import { logger } from '../config/logger';
import { AlertSeverity } from './AlertService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricsService {
  private static instance: MetricsService;
  private static registry: Registry;

  // Métricas HTTP
  private static readonly httpRequestDuration = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duração das requisições HTTP em segundos',
    labelNames: ['method', 'path', 'status'],
    buckets: [0.1, 0.5, 1, 2, 5],
  });

  private static readonly httpRequestTotal = new Counter({
    name: 'http_requests_total',
    help: 'Total de requisições HTTP',
    labelNames: ['method', 'path', 'status'],
  });

  private static readonly httpRequestErrors = new Counter({
    name: 'http_request_errors_total',
    help: 'Total de erros em requisições HTTP',
    labelNames: ['method', 'path', 'status'],
  });

  // Métricas de Cache
  private static readonly cacheHits = new Counter({
    name: 'cache_hits_total',
    help: 'Total de hits no cache',
    labelNames: ['service', 'operation'],
  });

  private static readonly cacheMisses = new Counter({
    name: 'cache_misses_total',
    help: 'Total de misses no cache',
    labelNames: ['service', 'operation'],
  });

  private static readonly cacheOperations = new Histogram({
    name: 'cache_operation_duration_seconds',
    help: 'Duração das operações de cache em segundos',
    labelNames: ['service', 'operation'],
    buckets: [0.01, 0.05, 0.1, 0.5, 1],
  });

  // Métricas de Alertas
  private static readonly alertCount = new Counter({
    name: 'alert_count_total',
    help: 'Total de alertas disparados',
    labelNames: ['name', 'severity'],
  });

  // Métricas de Pagamento
  private static readonly paymentPreferencesCreated = new Counter({
    name: 'onlywave_payment_preferences_created_total',
    help: 'Total de preferências de pagamento criadas',
    labelNames: ['payment_type'],
  });

  private static readonly paymentInitiated = new Counter({
    name: 'onlywave_payments_initiated_total',
    help: 'Total de pagamentos iniciados',
    labelNames: ['payment_type', 'status'],
  });

  private static readonly paymentRefunded = new Counter({
    name: 'onlywave_payments_refunded_total',
    help: 'Total de reembolsos processados',
    labelNames: ['payment_type', 'reason'],
  });

  private static readonly paymentProcessed = new Counter({
    name: 'onlywave_payments_processed_total',
    help: 'Total de pagamentos processados',
    labelNames: ['payment_type'],
  });

  private static readonly paymentAmount = new Histogram({
    name: 'onlywave_payment_amount',
    help: 'Valor dos pagamentos processados',
    labelNames: ['payment_type'],
    buckets: [10, 50, 100, 500, 1000, 5000, 10000],
  });

  private static readonly paymentProcessingDuration = new Histogram({
    name: 'onlywave_payment_processing_duration_seconds',
    help: 'Duração do processamento de pagamentos',
    labelNames: ['payment_type', 'operation'],
    buckets: [0.1, 0.5, 1, 2, 5, 10, 30, 60],
  });

  // Métricas de Webhook
  private static readonly webhookOutOfOrder = new Counter({
    name: 'onlywave_webhook_out_of_order_total',
    help: 'Total de webhooks recebidos fora de ordem',
    labelNames: ['payment_type'],
  });

  private static readonly webhookIdempotencyIgnored = new Counter({
    name: 'onlywave_webhook_idempotency_ignored_total',
    help: 'Total de webhooks ignorados por idempotência',
    labelNames: ['payment_type'],
  });

  private static readonly webhookFailures = new Counter({
    name: 'onlywave_webhook_failures_total',
    help: 'Total de falhas no processamento de webhooks',
    labelNames: ['payment_type', 'error_type'],
  });

  private static readonly webhookSuccess = new Counter({
    name: 'onlywave_webhook_success_total',
    help: 'Total de webhooks processados com sucesso',
    labelNames: ['payment_type'],
  });

  private static readonly webhookProcessingDuration = new Histogram({
    name: 'onlywave_webhook_processing_duration_seconds',
    help: 'Duração do processamento de webhooks',
    labelNames: ['payment_type'],
    buckets: [0.1, 0.5, 1, 2, 5],
  });

  // Métricas Redis
  private static readonly redisConnections = new Counter({
    name: 'redis_connections_total',
    help: 'Total number of Redis connections',
    labelNames: ['status'],
  });

  private static readonly redisErrors = new Counter({
    name: 'redis_errors_total',
    help: 'Total number of Redis errors',
    labelNames: ['type'],
  });

  private static readonly redisOperations = new Histogram({
    name: 'redis_operation_duration_seconds',
    help: 'Duration of Redis operations',
    labelNames: ['operation'],
    buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  });

  private static readonly pubSubMessages = new Counter({
    name: 'redis_pubsub_messages_total',
    help: 'Total number of Redis Pub/Sub messages',
    labelNames: ['channel', 'type'],
  });

  private static readonly listOperations = new Counter({
    name: 'redis_list_operations_total',
    help: 'Total number of Redis list operations',
    labelNames: ['operation'],
  });

  // Payment Metrics
  private static readonly paymentFailures = new Counter({
    name: 'onlywave_payment_failures_total',
    help: 'Total de falhas em pagamentos',
    labelNames: ['payment_type'],
  });

  private static readonly paymentRetries = new Counter({
    name: 'payment_retries_total',
    help: 'Total number of payment retries',
    labelNames: ['status'],
  });

  // Queue Metrics
  private static readonly queueSize = new Gauge({
    name: 'queue_size',
    help: 'Current size of the queue',
    labelNames: ['queue'],
  });

  private static readonly queueProcessingDuration = new Histogram({
    name: 'queue_processing_duration_seconds',
    help: 'Duration of queue processing',
    labelNames: ['queue'],
    buckets: [0.1, 0.5, 1, 2, 5, 10, 30, 60],
  });

  private static readonly queueFailures = new Counter({
    name: 'queue_failures_total',
    help: 'Total number of queue processing failures',
    labelNames: ['queue', 'type'],
  });

  // Métricas de Resiliência
  private static readonly resilienceValidationErrors = new Counter({
    name: 'resilience_validation_errors_total',
    help: 'Total de erros de validação durante testes de resiliência',
    labelNames: ['type', 'service'] as const,
  });

  private static readonly resilienceBlacklistErrors = new Counter({
    name: 'resilience_blacklist_errors_total',
    help: 'Total de erros relacionados à blacklist durante testes de resiliência',
    labelNames: ['operation'] as const,
  });

  private static readonly resilienceRedisErrors = new Counter({
    name: 'resilience_redis_errors_total',
    help: 'Total de erros do Redis durante testes de resiliência',
    labelNames: ['operation'] as const,
  });

  private static readonly resilienceLoadTestDuration = new Histogram({
    name: 'resilience_load_test_duration_seconds',
    help: 'Duração dos testes de carga',
    labelNames: ['test_type'] as const,
    buckets: [1, 5, 10, 30, 60, 120, 300],
  });

  private static readonly resilienceTimeoutErrors = new Counter({
    name: 'resilience_timeout_errors_total',
    help: 'Total de erros de timeout durante testes de resiliência',
    labelNames: ['service', 'operation'] as const,
  });

  private static readonly resilienceDegradationEvents = new Counter({
    name: 'resilience_degradation_events_total',
    help: 'Total de eventos de degradação durante testes de resiliência',
    labelNames: ['service', 'severity'] as const,
  });

  private static readonly authSuccess = new Counter({
    name: 'auth_success_total',
    help: 'Total de autenticações bem-sucedidas',
    labelNames: ['service', 'operation'],
  });

  private static readonly authFailure = new Counter({
    name: 'auth_failure_total',
    help: 'Total de falhas de autenticação',
    labelNames: ['service', 'operation'],
  });

  private static readonly paymentSuccess = new Counter({
    name: 'payment_success_total',
    help: 'Total de pagamentos bem-sucedidos',
    labelNames: ['service', 'operation'],
  });

  private static readonly paymentFailure = new Counter({
    name: 'payment_failure_total',
    help: 'Total de falhas em pagamentos',
    labelNames: ['service', 'operation'],
  });

  private static readonly activeUsers = new Gauge({
    name: 'active_users',
    help: 'Número de usuários ativos',
    labelNames: ['service'],
  });

  private static readonly paymentProcessingTime = new Histogram({
    name: 'payment_processing_seconds',
    help: 'Tempo de processamento de pagamentos',
    labelNames: ['service', 'operation'],
    buckets: [0.1, 0.5, 1, 2, 5],
  });

  constructor() {
    if (!MetricsService.registry) {
      MetricsService.registry = new Registry();
      MetricsService.registry.registerMetric(MetricsService.httpRequestDuration);
      MetricsService.registry.registerMetric(MetricsService.httpRequestTotal);
      MetricsService.registry.registerMetric(MetricsService.httpRequestErrors);
      MetricsService.registry.registerMetric(MetricsService.cacheHits);
      MetricsService.registry.registerMetric(MetricsService.cacheMisses);
      MetricsService.registry.registerMetric(MetricsService.cacheOperations);
      MetricsService.registry.registerMetric(MetricsService.alertCount);
      MetricsService.registry.registerMetric(MetricsService.paymentPreferencesCreated);
      MetricsService.registry.registerMetric(MetricsService.paymentInitiated);
      MetricsService.registry.registerMetric(MetricsService.paymentRefunded);
      MetricsService.registry.registerMetric(MetricsService.paymentProcessed);
      MetricsService.registry.registerMetric(MetricsService.paymentAmount);
      MetricsService.registry.registerMetric(MetricsService.paymentProcessingDuration);
      MetricsService.registry.registerMetric(MetricsService.webhookOutOfOrder);
      MetricsService.registry.registerMetric(MetricsService.webhookIdempotencyIgnored);
      MetricsService.registry.registerMetric(MetricsService.webhookFailures);
      MetricsService.registry.registerMetric(MetricsService.webhookSuccess);
      MetricsService.registry.registerMetric(MetricsService.webhookProcessingDuration);
      MetricsService.registry.registerMetric(MetricsService.redisConnections);
      MetricsService.registry.registerMetric(MetricsService.redisErrors);
      MetricsService.registry.registerMetric(MetricsService.redisOperations);
      MetricsService.registry.registerMetric(MetricsService.pubSubMessages);
      MetricsService.registry.registerMetric(MetricsService.listOperations);
      MetricsService.registry.registerMetric(MetricsService.paymentFailures);
      MetricsService.registry.registerMetric(MetricsService.paymentRetries);
      MetricsService.registry.registerMetric(MetricsService.queueSize);
      MetricsService.registry.registerMetric(MetricsService.queueProcessingDuration);
      MetricsService.registry.registerMetric(MetricsService.queueFailures);
      MetricsService.registry.registerMetric(MetricsService.resilienceValidationErrors);
      MetricsService.registry.registerMetric(MetricsService.resilienceBlacklistErrors);
      MetricsService.registry.registerMetric(MetricsService.resilienceRedisErrors);
      MetricsService.registry.registerMetric(MetricsService.resilienceLoadTestDuration);
      MetricsService.registry.registerMetric(MetricsService.resilienceTimeoutErrors);
      MetricsService.registry.registerMetric(MetricsService.resilienceDegradationEvents);
      MetricsService.registry.registerMetric(MetricsService.authSuccess);
      MetricsService.registry.registerMetric(MetricsService.authFailure);
      MetricsService.registry.registerMetric(MetricsService.paymentSuccess);
      MetricsService.registry.registerMetric(MetricsService.paymentFailure);
      MetricsService.registry.registerMetric(MetricsService.activeUsers);
      MetricsService.registry.registerMetric(MetricsService.paymentProcessingTime);
    }
  }

  public static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }

  public static getMetricsContentType(): string {
    return MetricsService.registry.contentType;
  }

  public static async getMetrics(): Promise<string> {
    return MetricsService.registry.metrics();
  }

  public static httpMetricsMiddleware(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const path = req.route ? req.route.path : req.path;
      const method = req.method;
      const status = res.statusCode;

      MetricsService.incrementHttpRequests({ method, path, status });
      MetricsService.observeHttpDuration({ method, path, status, duration });

      if (status >= 400) {
        MetricsService.httpRequestErrors.inc({ method, path, status: status.toString() });
      }
    });

    next();
  }

  public static incrementHttpRequests({
    method,
    path,
    status,
  }: {
    method: string;
    path: string;
    status: number;
  }): void {
    MetricsService.httpRequestTotal.inc({ method, path, status: status.toString() });
  }

  public static observeHttpDuration({
    method,
    path,
    status,
    duration,
  }: {
    method: string;
    path: string;
    status: number;
    duration: number;
  }): void {
    MetricsService.httpRequestDuration.observe(
      { method, path, status: status.toString() },
      duration / 1000,
    );
  }

  public static incrementCacheHit(service: string, operation: string): void {
    MetricsService.cacheHits.inc({ service, operation });
  }

  public static incrementCacheMiss(service: string, operation: string): void {
    MetricsService.cacheMisses.inc({ service, operation });
  }

  public static observeCacheOperation(service: string, operation: string, duration: number): void {
    MetricsService.cacheOperations.observe({ service, operation }, duration / 1000);
  }

  public static incrementAlertCount(name: string, severity: AlertSeverity): void {
    MetricsService.alertCount.inc({ name, severity });
  }

  public static incrementPaymentPreferencesCreated(paymentType: string): void {
    MetricsService.paymentPreferencesCreated.inc({ payment_type: paymentType });
  }

  public static incrementPaymentInitiated(paymentType: string, status: string): void {
    MetricsService.paymentInitiated.inc({ payment_type: paymentType, status });
  }

  public static incrementPaymentRefunded(paymentType: string, reason: string): void {
    MetricsService.paymentRefunded.inc({ payment_type: paymentType, reason });
  }

  public static incrementPaymentProcessed(paymentType: string): void {
    MetricsService.paymentProcessed.inc({ payment_type: paymentType });
  }

  public static recordPaymentAmount(amount: number, paymentType: string): void {
    MetricsService.paymentAmount.observe({ payment_type: paymentType }, amount);
  }

  public static observePaymentProcessingDuration(
    type: string,
    operation: string,
    duration: number,
  ): void {
    MetricsService.paymentProcessingDuration.observe(
      { payment_type: type, operation },
      duration / 1000,
    );
  }

  public static incrementWebhookOutOfOrder(type: string): void {
    MetricsService.webhookOutOfOrder.inc({ payment_type: type });
  }

  public static incrementWebhookIdempotencyIgnored(type: string): void {
    MetricsService.webhookIdempotencyIgnored.inc({ payment_type: type });
  }

  public static incrementWebhookFailures(paymentType: string, errorType: string): void {
    MetricsService.webhookFailures.inc({ payment_type: paymentType, error_type: errorType });
  }

  public static incrementWebhookSuccess(paymentType: string): void {
    MetricsService.webhookSuccess.inc({ payment_type: paymentType });
  }

  public static incrementWebhookFailure(paymentType: string): void {
    MetricsService.webhookFailures.inc({ payment_type: paymentType, error_type: 'general' });
  }

  public static observeWebhookProcessingDuration(type: string, duration: number): void {
    MetricsService.webhookProcessingDuration.observe({ payment_type: type }, duration / 1000);
  }

  public static resetMetrics(): void {
    MetricsService.registry.resetMetrics();
    logger.info('Métricas resetadas com sucesso');
  }

  // Redis Metrics Methods
  public static incrementRedisConnections(status: string): void {
    MetricsService.redisConnections.inc({ status });
  }

  public static incrementRedisErrors(type: string): void {
    MetricsService.redisErrors.inc({ type });
  }

  public static observeRedisOperation(operation: string, duration: number): void {
    MetricsService.redisOperations.observe({ operation }, duration / 1000);
  }

  public static incrementPubSubMessages(channel: string, type: string): void {
    MetricsService.pubSubMessages.inc({ channel, type });
  }

  public static incrementListOperations(operation: string): void {
    MetricsService.listOperations.inc({ operation });
  }

  // Payment Metrics Methods
  public static observePaymentProcessing(status: string, duration: number): void {
    MetricsService.paymentProcessingDuration.observe({ status }, duration / 1000);
  }

  public static incrementPaymentFailures(type: string): void {
    MetricsService.paymentFailures.inc({ payment_type: type });
  }

  public static incrementPaymentRetries(status: string): void {
    MetricsService.paymentRetries.inc({ status });
  }

  // Cache Metrics Methods
  public static incrementCacheHits(type: string): void {
    MetricsService.cacheHits.inc({ type });
  }

  public static incrementCacheMisses(type: string): void {
    MetricsService.cacheMisses.inc({ type });
  }

  // Queue Metrics Methods
  public static setQueueSize(queue: string, size: number): void {
    MetricsService.queueSize.set({ queue }, size);
  }

  public static observeQueueProcessing(queue: string, duration: number): void {
    MetricsService.queueProcessingDuration.observe({ queue }, duration / 1000);
  }

  public static incrementQueueFailures(queue: string, type: string): void {
    MetricsService.queueFailures.inc({ queue, type });
  }

  // Métodos de Resiliência
  public static incrementResilienceValidationError(type: string, service: string): void {
    MetricsService.resilienceValidationErrors.inc({ type, service });
  }

  public static incrementResilienceBlacklistError(operation: string): void {
    MetricsService.resilienceBlacklistErrors.inc({ operation });
  }

  public static incrementResilienceRedisError(operation: string): void {
    MetricsService.resilienceRedisErrors.inc({ operation });
  }

  public static observeResilienceLoadTestDuration(testType: string, duration: number): void {
    MetricsService.resilienceLoadTestDuration.observe({ test_type: testType }, duration);
  }

  public static incrementResilienceTimeoutError(service: string, operation: string): void {
    MetricsService.resilienceTimeoutErrors.inc({ service, operation });
  }

  public static incrementResilienceDegradationEvent(service: string, severity: string): void {
    MetricsService.resilienceDegradationEvents.inc({ service, severity });
  }

  public static recordPaymentProcessingDuration(duration: number): void {
    MetricsService.paymentProcessingDuration.observe(
      { payment_type: 'all', operation: 'process' },
      duration,
    );
  }

  public static recordPaymentFailure(paymentType: string): void {
    MetricsService.paymentFailures.inc({ payment_type: paymentType });
  }

  public static recordPaymentRefunded(paymentType: string): void {
    MetricsService.paymentRefunded.inc({ payment_type: paymentType, reason: 'user_request' });
  }

  public static incrementAuthSuccess(): void {
    MetricsService.authSuccess.inc({ service: 'auth', operation: 'login' });
  }

  public static incrementAuthFailure(): void {
    MetricsService.authFailure.inc({ service: 'auth', operation: 'login' });
  }

  public static incrementPaymentSuccess(): void {
    MetricsService.paymentSuccess.inc({ service: 'payment', operation: 'process' });
  }

  public static incrementPaymentFailure(): void {
    MetricsService.paymentFailure.inc({ service: 'payment', operation: 'process' });
  }

  public static setActiveUsers(count: number): void {
    MetricsService.activeUsers.set({ service: 'auth' }, count);
  }

  public static observePaymentProcessingTime(duration: number): void {
    MetricsService.paymentProcessingTime.observe(
      { service: 'payment', operation: 'process' },
      duration,
    );
  }
}
