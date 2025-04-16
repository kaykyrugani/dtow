import { z } from 'zod';

// Definição do PaymentType alinhada com o Mercado Pago
export type PaymentType = 'CREDIT_CARD' | 'PIX' | 'BANK_SLIP';
export type MercadoPagoPaymentType = 'credit_card' | 'pix' | 'bank_transfer';

// Schema para criação de preferência
export const createPreferenceSchema = z.object({
  pedidoId: z.string(),
  descricao: z.string(),
  valor: z.number(),
  paymentType: z.enum(['CREDIT_CARD', 'PIX', 'BANK_SLIP']),
  comprador: z.object({
    nome: z.string(),
    email: z.string().email(),
    cpf: z.string()
  }),
  parcelas: z.number().optional()
});

// Schema para webhook alinhado com a API do Mercado Pago
export const webhookSchema = z.object({
  action: z.enum(['payment.created', 'payment.updated', 'payment.cancelled']),
  data: z.object({
    id: z.string()
  })
});

// Schema para reembolso
export const refundSchema = z.object({
  reason: z.string(),
  amount: z.number().optional()
});

// Interfaces de resposta
export interface PaymentPreferenceResponse {
  id: string;
  init_point: string;
  valorOriginal: number;
  valorFinal: number;
  desconto: number;
}

export interface PaymentResponse {
  id: string;
  status: string;
  api_response: {
    status: number;
    headers: Record<string, string>;
  };
}

// Interface para o DTO de pagamento
export interface PaymentDTO {
  tipo: PaymentType;
  formaPagamento: MercadoPagoPaymentType;
}

export interface PaymentPreferenceDTO {
  pedidoId: string;
  descricao: string;
  valor: number;
  paymentType: PaymentType;
  comprador: {
    nome: string;
    email: string;
    cpf: string;
  };
  parcelas?: number;
}

// Interface do webhook alinhada com a API do Mercado Pago
export interface WebhookDTO {
  action: 'payment.created' | 'payment.updated' | 'payment.cancelled';
  data: {
    id: string;
  };
}

export interface RefundDTO {
  reason: string;
  amount?: number;
}

// Mapeamento de tipos de pagamento
export const paymentTypeMap: Record<PaymentType, MercadoPagoPaymentType> = {
  CREDIT_CARD: 'credit_card',
  PIX: 'pix',
  BANK_SLIP: 'bank_transfer'
}; 