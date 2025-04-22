import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class RefundDto {
  @ApiProperty({ description: 'Valor do reembolso', minimum: 0 })
  @IsNumber()
  @Min(0)
  amount: number;
}
