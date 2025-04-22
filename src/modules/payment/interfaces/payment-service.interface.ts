import { Payment } from '../entities/payment.entity';
import { PaymentStatus } from './payment-status.interface';

export interface PaymentService {
  processWebhook(webhookData: any): Promise<Payment>;
  refundPayment(paymentId: string, amount?: number): Promise<Payment>;
  getPaymentById(paymentId: string): Promise<Payment | null>;
  getPaymentsByCustomerId(customerId: string): Promise<Payment[]>;
  getPaymentsByOrderId(orderId: string): Promise<Payment[]>;
  getPaymentByWebhookId(webhookId: string): Promise<Payment | null>;
  savePayment(payment: Payment): Promise<Payment>;
}
