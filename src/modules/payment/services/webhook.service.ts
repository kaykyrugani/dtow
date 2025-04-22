import { Injectable } from '@nestjs/common';
import { WebhookRepository } from '../repositories/webhook.repository';
import { MetricsService } from '../../../services/metrics.service';
import { WebhookData } from '../interfaces/webhook-data.interface';

@Injectable()
export class WebhookService {
  constructor(private readonly webhookRepository: WebhookRepository) {}

  async handleWebhook(data: WebhookData): Promise<void> {
    const startTime = Date.now();

    try {
      // Verifica idempotência
      const existingWebhook = await this.webhookRepository.findByExternalId(data.externalId);
      if (existingWebhook) {
        MetricsService.incrementWebhookIdempotencyIgnored(data.paymentType);
        return;
      }

      // Verifica ordem dos webhooks
      const lastWebhook = await this.webhookRepository.findLastByPaymentId(data.paymentId);
      if (lastWebhook && lastWebhook.timestamp > data.timestamp) {
        MetricsService.incrementWebhookOutOfOrder(data.paymentType);
      }

      // Processa o webhook
      await this.webhookRepository.create(data);

      // Registra duração do processamento
      const duration = Date.now() - startTime;
      MetricsService.observePaymentProcessingDuration(
        data.paymentType,
        'webhook_processing',
        duration,
      );
    } catch (error) {
      MetricsService.incrementWebhookFailures(data.paymentType, error.name);
      throw error;
    }
  }

  async retryFailedWebhooks(): Promise<void> {
    const failedWebhooks = await this.webhookRepository.findFailed();

    for (const webhook of failedWebhooks) {
      const startTime = Date.now();

      try {
        await this.handleWebhook(webhook);

        const duration = Date.now() - startTime;
        MetricsService.observePaymentProcessingDuration(
          webhook.paymentType,
          'webhook_retry',
          duration,
        );
      } catch (error) {
        MetricsService.incrementWebhookFailures(webhook.paymentType, error.name);
      }
    }
  }
}
