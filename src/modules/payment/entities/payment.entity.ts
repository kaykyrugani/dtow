import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentStatus } from '../interfaces/payment-status.interface';
import { ApiProperty } from '@nestjs/swagger';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID do pagamento' })
  id: string;

  @Column()
  @ApiProperty({ description: 'ID do cliente' })
  customerId: string;

  @Column()
  @ApiProperty({ description: 'ID do pedido' })
  orderId: string;

  @Column()
  @ApiProperty({ description: 'Valor do pagamento' })
  amount: number;

  @Column()
  @ApiProperty({ description: 'Moeda do pagamento' })
  currency: string;

  @Column()
  @ApiProperty({ description: 'Método de pagamento' })
  paymentMethod: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  @ApiProperty({ description: 'Status do pagamento' })
  status: PaymentStatus;

  @Column({ nullable: true })
  @ApiProperty({ description: 'ID do webhook' })
  webhookId: string;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({ description: 'Metadados adicionais', required: false })
  metadata: Record<string, any>;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty({ description: 'Valor reembolsado' })
  refundedAmount: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'Data de criação do pagamento' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Data de atualização do pagamento' })
  updatedAt: Date;
}
