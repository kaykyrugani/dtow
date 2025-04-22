import { Injectable } from '@nestjs/common';
import { WebhookData } from '../interfaces/webhook-data.interface';

@Injectable()
export class WebhookRepository {
  private webhooks: Map<string, WebhookData> = new Map();

  async save(webhook: WebhookData): Promise<void> {
    this.webhooks.set(webhook.externalId, webhook);
  }

  async findById(externalId: string): Promise<WebhookData | null> {
    return this.webhooks.get(externalId) || null;
  }

  async findFailed(): Promise<WebhookData[]> {
    return Array.from(this.webhooks.values()).filter(webhook => webhook.status === 'failed');
  }
}
