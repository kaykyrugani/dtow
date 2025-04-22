import { ApiProperty } from '@nestjs/swagger';
import { Webhook } from '../entities/webhook.entity';
import { WebhookStatus } from '../interfaces/webhook-status.interface';

export class WebhookResponseDto implements Partial<Webhook> {
  @ApiProperty({ description: 'ID do webhook' })
  id: string;

  @ApiProperty({ description: 'Tipo do evento' })
  eventType: string;

  @ApiProperty({ description: 'Dados do evento' })
  eventData: Record<string, any>;

  @ApiProperty({ description: 'Status do processamento', enum: WebhookStatus })
  status: WebhookStatus;

  @ApiProperty({ description: 'Data de criação do webhook' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização do webhook' })
  updatedAt: Date;

  @ApiProperty({ description: 'Data de processamento do webhook', required: false })
  processedAt?: Date;

  @ApiProperty({ description: 'Tentativas de processamento' })
  attempts: number;

  @ApiProperty({ description: 'Erro de processamento', required: false })
  error?: string;
}
