import { z } from 'zod';

export const createPaymentSchema = z.object({
  amount: z.number().positive('O valor deve ser positivo'),
  currency: z.enum(['BRL', 'USD', 'EUR'], {
    errorMap: () => ({ message: 'Moeda inválida' }),
  }),
  description: z
    .string()
    .min(3, 'A descrição deve ter no mínimo 3 caracteres')
    .max(255, 'A descrição deve ter no máximo 255 caracteres'),
  paymentMethod: z.enum(['credit_card', 'debit_card', 'pix'], {
    errorMap: () => ({ message: 'Método de pagamento inválido' }),
  }),
  customer: z.object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    document: z.string().regex(/^\d{11}$|^\d{14}$/, 'CPF/CNPJ inválido'),
  }),
});

export const refundPaymentSchema = z.object({
  paymentId: z.string().uuid('ID de pagamento inválido'),
  amount: z.number().positive('O valor deve ser positivo').optional(),
  reason: z
    .string()
    .min(3, 'O motivo deve ter no mínimo 3 caracteres')
    .max(255, 'O motivo deve ter no máximo 255 caracteres'),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type RefundPaymentInput = z.infer<typeof refundPaymentSchema>;
