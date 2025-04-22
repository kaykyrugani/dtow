import { PaymentStatus } from './payment-status.interface';

export interface PaymentData {
  id: string;
  amount: number;
  status: PaymentStatus;
  external_reference?: string;
  payment_type_id: string;
  created_at: Date;
  updated_at: Date;
}
