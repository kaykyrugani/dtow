import { Injectable } from '@nestjs/common';
import { Counter, Gauge, Histogram } from 'prom-client';
import { register } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly paymentCounter: Counter;
  private readonly paymentAmountGauge: Gauge;
  private readonly processingDurationHistogram: Histogram;
  private readonly failureCounter: Counter;
  private readonly refundCounter: Counter;
  private readonly cacheHitsCounter: Counter;
  private readonly cacheMissesCounter: Counter;
  private readonly cacheErrorsCounter: Counter;
  private readonly webhookQueueGauge: Gauge;
  private readonly webhookErrorsCounter: Counter;
  private readonly eventCounter: Counter;
  private readonly eventErrorsCounter: Counter;
  private readonly metricsUpdateCounter: Counter;
  private readonly metricsErrorCounter: Counter;
  private metrics: Map<string, Counter | Histogram> = new Map();

  constructor() {
    this.paymentCounter = new Counter({
      name: 'payment_processed_total',
      help: 'Total number of processed payments',
      labelNames: ['payment_type'],
    });

    this.paymentAmountGauge = new Gauge({
      name: 'payment_amount',
      help: 'Payment amount in cents',
      labelNames: ['payment_type'],
    });

    this.processingDurationHistogram = new Histogram({
      name: 'payment_processing_duration_seconds',
      help: 'Payment processing duration in seconds',
      buckets: [0.1, 0.5, 1, 2, 5],
    });

    this.failureCounter = new Counter({
      name: 'payment_failures_total',
      help: 'Total number of payment failures',
      labelNames: ['type', 'reason'],
    });

    this.refundCounter = new Counter({
      name: 'payment_refunds_total',
      help: 'Total number of payment refunds',
      labelNames: ['payment_type'],
    });

    this.cacheHitsCounter = new Counter({
      name: 'payment_cache_hits_total',
      help: 'Total number of cache hits',
    });

    this.cacheMissesCounter = new Counter({
      name: 'payment_cache_misses_total',
      help: 'Total number of cache misses',
    });

    this.cacheErrorsCounter = new Counter({
      name: 'payment_cache_errors_total',
      help: 'Total number of cache errors',
    });

    this.webhookQueueGauge = new Gauge({
      name: 'webhook_queue_size',
      help: 'Current size of webhook queue',
    });

    this.webhookErrorsCounter = new Counter({
      name: 'webhook_errors_total',
      help: 'Total number of webhook processing errors',
    });

    this.eventCounter = new Counter({
      name: 'payment_events_published_total',
      help: 'Total number of payment events published',
    });

    this.eventErrorsCounter = new Counter({
      name: 'payment_event_errors_total',
      help: 'Total number of payment event errors',
    });

    this.metricsUpdateCounter = new Counter({
      name: 'payment_metrics_updates_total',
      help: 'Total number of payment metrics updates',
    });

    this.metricsErrorCounter = new Counter({
      name: 'payment_metrics_errors_total',
      help: 'Total number of payment metrics errors',
    });
  }

  recordPaymentProcessed(paymentType: string): void {
    this.paymentCounter.inc({ payment_type: paymentType });
  }

  recordPaymentAmount(amount: number, paymentType: string): void {
    this.paymentAmountGauge.set({ payment_type: paymentType }, amount);
  }

  recordPaymentProcessingDuration(durationMs: number): void {
    this.processingDurationHistogram.observe(durationMs / 1000);
  }

  recordPaymentFailure(type: string, reason?: string): void {
    this.failureCounter.inc({ type, reason: reason || 'unknown' });
  }

  recordPaymentRefunded(paymentType: string): void {
    this.refundCounter.inc({ payment_type: paymentType });
  }

  incrementPaymentCacheHits(): void {
    this.cacheHitsCounter.inc();
  }

  incrementPaymentCacheMisses(): void {
    this.cacheMissesCounter.inc();
  }

  incrementPaymentCacheErrors(): void {
    this.cacheErrorsCounter.inc();
  }

  incrementWebhookQueueSize(): void {
    this.webhookQueueGauge.inc();
  }

  decrementWebhookQueueSize(): void {
    this.webhookQueueGauge.dec();
  }

  incrementWebhookQueueErrors(): void {
    this.webhookErrorsCounter.inc();
  }

  incrementPaymentEventsPublished(): void {
    this.eventCounter.inc();
  }

  incrementPaymentEventErrors(): void {
    this.eventErrorsCounter.inc();
  }

  incrementPaymentMetricsUpdates(): void {
    this.metricsUpdateCounter.inc();
  }

  incrementPaymentMetricsErrors(): void {
    this.metricsErrorCounter.inc();
  }

  recordMetric(name: string, value: number, labels?: Partial<Record<string, string | number>>) {
    let metric = this.metrics.get(name);

    if (!metric) {
      metric = new Counter({
        name,
        help: `Counter for ${name}`,
        labelNames: labels ? Object.keys(labels) : undefined,
      });
      this.metrics.set(name, metric);
    }

    if (metric instanceof Counter) {
      metric.inc(labels || {});
    }
  }

  recordHistogram(name: string, value: number, labels?: Partial<Record<string, string | number>>) {
    let metric = this.metrics.get(name);

    if (!metric) {
      metric = new Histogram({
        name,
        help: `Histogram for ${name}`,
        labelNames: labels ? Object.keys(labels) : undefined,
      });
      this.metrics.set(name, metric);
    }

    if (metric instanceof Histogram) {
      metric.observe(labels || {}, value);
    }
  }

  async getMetrics(): Promise<string> {
    return register.metrics();
  }
}
