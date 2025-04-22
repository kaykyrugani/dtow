import { ApiProperty } from '@nestjs/swagger';
import { Refund } from '../entities/refund.entity';
import { RefundStatus } from '../interfaces/refund-status.interface';

export class RefundResponseDto implements Partial<Refund> {
  @ApiProperty({ description: 'ID do reembolso' })
  id: string;

  @ApiProperty({ description: 'ID do pagamento' })
  paymentId: string;

  @ApiProperty({ description: 'Valor do reembolso' })
  amount: number;

  @ApiProperty({ description: 'Status do reembolso', enum: RefundStatus })
  status: RefundStatus;

  @ApiProperty({ description: 'Motivo do reembolso', required: false })
  reason?: string;

  @ApiProperty({ description: 'Data de criação do reembolso' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização do reembolso' })
  updatedAt: Date;

  @ApiProperty({ description: 'Metadados adicionais', required: false })
  metadata?: Record<string, any>;
}
