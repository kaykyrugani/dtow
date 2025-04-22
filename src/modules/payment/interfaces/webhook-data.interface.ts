// Interface movida para payment.dto.ts

import { PaymentStatus } from './payment-status.interface';

export interface WebhookData {
  action: string;
  data: {
    id: string;
    amount: string;
    external_reference: string;
  };
  paymentType: string;
  timestamp: number;
  status: PaymentStatus;
}
