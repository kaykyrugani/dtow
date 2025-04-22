import { ApiProperty } from '@nestjs/swagger';
import { Payment } from '../entities/payment.entity';

export class PaymentResponseDto implements Partial<Payment> {
  @ApiProperty({ description: 'ID do pagamento' })
  id: string;

  @ApiProperty({ description: 'ID do webhook' })
  webhookId: string;

  @ApiProperty({ description: 'Valor do pagamento' })
  amount: number;

  @ApiProperty({ description: 'Valor reembolsado' })
  refundedAmount: number;

  @ApiProperty({ description: 'Moeda do pagamento' })
  currency: string;

  @ApiProperty({ description: 'Status do pagamento' })
  status: string;

  @ApiProperty({ description: 'Método de pagamento' })
  paymentMethod: string;

  @ApiProperty({ description: 'ID do cliente' })
  customerId: string;

  @ApiProperty({ description: 'ID do pedido' })
  orderId: string;

  @ApiProperty({ description: 'Data de criação do pagamento' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização do pagamento' })
  updatedAt: Date;

  @ApiProperty({ description: 'Metadados adicionais', required: false })
  metadata?: Record<string, any>;
}
