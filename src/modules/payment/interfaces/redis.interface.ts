import { PaymentStatus } from '../dtos/payment.dto';

export interface RedisPaymentKey {
  paymentId: string;
  type: 'payment' | 'preference' | 'webhook';
  ttl?: number;
}

export interface RedisWebhookQueue {
  paymentId: string;
  data: any;
  attempts: number;
  lastAttempt: Date;
  nextAttempt: Date;
  status: 'pending' | 'processing' | 'failed';
}

export interface RedisPaymentEvent {
  type: 'payment.created' | 'payment.updated' | 'payment.refunded';
  paymentId: string;
  status: PaymentStatus;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface RedisPaymentMetrics {
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  refundedPayments: number;
  averageProcessingTime: number;
  lastUpdated: Date;
}
