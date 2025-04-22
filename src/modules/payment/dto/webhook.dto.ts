import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsObject, IsOptional } from 'class-validator';

export class WebhookDto {
  @ApiProperty({ description: 'ID do webhook' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'ID do pagamento' })
  @IsString()
  payment_id: string;

  @ApiProperty({ description: 'Valor do pagamento' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Moeda do pagamento' })
  @IsString()
  currency: string;

  @ApiProperty({ description: 'Status do pagamento' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Método de pagamento' })
  @IsString()
  payment_method: string;

  @ApiProperty({ description: 'ID do cliente' })
  @IsString()
  customer_id: string;

  @ApiProperty({ description: 'ID do pedido' })
  @IsString()
  order_id: string;

  @ApiProperty({ description: 'Metadados adicionais', required: false })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
