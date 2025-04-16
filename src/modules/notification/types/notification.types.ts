import { JobsOptions } from 'bullmq';

export type NotificationType = 
  | 'order_confirmation'
  | 'order_status_update'
  | 'password_recovery'
  | 'welcome'
  | 'coupon_activation'
  | 'product_available';

export type NotificationPriority = 'high' | 'normal' | 'low';

export interface Recipient {
  email: string;
  name?: string;
}

export interface NotificationData {
  type: NotificationType;
  priority: NotificationPriority;
  recipient: Recipient;
  data: Record<string, any>;
  metadata?: {
    userId?: string;
    orderId?: string;
    productId?: string;
    [key: string]: any;
  };
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface NotificationResult {
  success: boolean;
  messageId?: string;
  error?: string;
  metadata?: Record<string, any>;
}

export interface QueueOptions extends Partial<JobsOptions> {
  attempts?: number;
  backoff?: {
    type: 'fixed' | 'exponential';
    delay: number;
  };
  removeOnComplete?: boolean;
  removeOnFail?: boolean;
} 