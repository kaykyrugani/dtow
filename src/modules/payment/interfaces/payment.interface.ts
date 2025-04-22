import { PaymentStatus } from './payment-status.interface';

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  customerId: string;
  orderId: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  refundedAmount?: number;
  refundReason?: string;
  webhookId?: string;
}
