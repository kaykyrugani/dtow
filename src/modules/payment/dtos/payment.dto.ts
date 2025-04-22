import { z } from 'zod';
import { PaymentType } from '../../../generated/prisma';

// Definição do PaymentType alinhada com o Mercado Pago
export type MercadoPagoPaymentType = 'credit_card' | 'pix' | 'bank_transfer';

// Schema para criação de preferência de pagamento
export const createPreferenceSchema = z.object({
  pedidoId: z.string(),
  descricao: z.string(),
  valor: z.number().positive(),
  formaPagamento: z.nativeEnum(PaymentType),
  comprador: z.object({
    nome: z.string(),
    email: z.string().email(),
    cpf: z.string(),
  }),
  parcelas: z.number().int().min(1).max(12).optional(),
});

// Schema para webhook
export const webhookSchema = z.object({
  action: z.string(),
  data: z.object({
    id: z.string(),
    amount: z.string(),
    external_reference: z.string(),
  }),
  paymentType: z.string(),
  timestamp: z.number(),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled', 'refunded', 'charged_back']),
});

// Schema para reembolso
export const refundSchema = z.object({
  amount: z.number().positive().optional(),
});

// Tipos inferidos dos schemas
export type CreatePreferenceDTO = z.infer<typeof createPreferenceSchema>;
export type WebhookDTO = z.infer<typeof webhookSchema>;
export type RefundDTO = z.infer<typeof refundSchema>;

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

export type PaymentStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'refunded'
  | 'charged_back';

export interface WebhookData {
  id: string;
  amount: string;
  external_reference: string;
  [key: string]: any;
}

export interface PaymentPreferenceDTO {
  pedidoId: string;
  descricao: string;
  valor: number;
  parcelas?: number;
  paymentType: string;
  comprador: {
    nome: string;
    email: string;
    cpf: string;
  };
}

export const paymentTypeMap: { [key: string]: string } = {
  credit_card: 'credit_card',
  debit_card: 'debit_card',
  pix: 'pix',
  boleto: 'boleto',
};
