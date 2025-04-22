import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { MetricsService } from '../../metrics/metrics.service';
import {
  RedisPaymentKey,
  RedisWebhookQueue,
  RedisPaymentEvent,
  RedisPaymentMetrics,
} from '../interfaces/redis.interface';
import { PaymentStatus } from '../dtos/payment.dto';

@Injectable()
export class PaymentRedisService {
  private readonly logger = new Logger(PaymentRedisService.name);
  private readonly PAYMENT_PREFIX = 'payment:';
  private readonly WEBHOOK_QUEUE = 'webhook:queue';
  private readonly PAYMENT_EVENTS = 'payment:events';
  private readonly PAYMENT_METRICS = 'payment:metrics';

  constructor(
    private readonly redisService: RedisService,
    private readonly metricsService: MetricsService,
  ) {}

  async cachePaymentPreference(key: RedisPaymentKey, data: any): Promise<void> {
    const redisKey = this.buildPaymentKey(key);
    try {
      await this.redisService.set(redisKey, JSON.stringify(data), key.ttl || 3600);
      this.metricsService.incrementPaymentCacheHits();
    } catch (error) {
      this.logger.error(`Erro ao cachear preferência de pagamento: ${error.message}`);
      this.metricsService.incrementPaymentCacheErrors();
      throw error;
    }
  }

  async getCachedPaymentPreference(key: RedisPaymentKey): Promise<any | null> {
    const redisKey = this.buildPaymentKey(key);
    try {
      const data = await this.redisService.get(redisKey);
      if (data) {
        this.metricsService.incrementPaymentCacheHits();
        return JSON.parse(data);
      }
      this.metricsService.incrementPaymentCacheMisses();
      return null;
    } catch (error) {
      this.logger.error(`Erro ao buscar preferência de pagamento do cache: ${error.message}`);
      this.metricsService.incrementPaymentCacheErrors();
      throw error;
    }
  }

  async queueWebhook(webhook: RedisWebhookQueue): Promise<void> {
    try {
      await this.redisService.lpush(this.WEBHOOK_QUEUE, JSON.stringify(webhook));
      this.metricsService.incrementWebhookQueueSize();
    } catch (error) {
      this.logger.error(`Erro ao enfileirar webhook: ${error.message}`);
      this.metricsService.incrementWebhookQueueErrors();
      throw error;
    }
  }

  async getNextWebhook(): Promise<RedisWebhookQueue | null> {
    try {
      const data = await this.redisService.rpop(this.WEBHOOK_QUEUE);
      if (data) {
        this.metricsService.decrementWebhookQueueSize();
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      this.logger.error(`Erro ao obter próximo webhook: ${error.message}`);
      this.metricsService.incrementWebhookQueueErrors();
      throw error;
    }
  }

  async publishPaymentEvent(event: RedisPaymentEvent): Promise<void> {
    try {
      await this.redisService.publish(this.PAYMENT_EVENTS, JSON.stringify(event));
      this.metricsService.incrementPaymentEventsPublished();
    } catch (error) {
      this.logger.error(`Erro ao publicar evento de pagamento: ${error.message}`);
      this.metricsService.incrementPaymentEventErrors();
      throw error;
    }
  }

  async updatePaymentMetrics(metrics: RedisPaymentMetrics): Promise<void> {
    try {
      await this.redisService.set(this.PAYMENT_METRICS, JSON.stringify(metrics));
      this.metricsService.incrementPaymentMetricsUpdates();
    } catch (error) {
      this.logger.error(`Erro ao atualizar métricas de pagamento: ${error.message}`);
      this.metricsService.incrementPaymentMetricsErrors();
      throw error;
    }
  }

  async getPaymentMetrics(): Promise<RedisPaymentMetrics | null> {
    try {
      const data = await this.redisService.get(this.PAYMENT_METRICS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      this.logger.error(`Erro ao obter métricas de pagamento: ${error.message}`);
      this.metricsService.incrementPaymentMetricsErrors();
      throw error;
    }
  }

  private buildPaymentKey(key: RedisPaymentKey): string {
    return `${this.PAYMENT_PREFIX}${key.type}:${key.paymentId}`;
  }
}
