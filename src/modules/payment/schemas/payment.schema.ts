import { z } from 'zod';
import { customValidators, ErrorCodes } from '../../../utils/validators';

// Schema para dados do cartão
const cardSchema = z.object({
  number: z
    .string()
    .regex(/^\d{16}$/, 'O número do cartão deve conter 16 dígitos, sem espaços')
    .transform(val => val.replace(/\s/g, '')),
  holderName: z
    .string()
    .min(3, 'Nome do titular deve ter no mínimo 3 caracteres')
    .transform(val => val.toUpperCase()),
  expirationDate: customValidators.dataExpiracao(),
  securityCode: z.string().regex(/^\d{3,4}$/, 'Código de segurança inválido (CVV)'),
});

// Schema para dados do cliente
const customerSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .transform(val => val.trim()),
  email: z
    .string()
    .email('Email inválido')
    .transform(val => val.toLowerCase())
    .refine(
      val => {
        const domain = val.split('@')[1];
        return ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'].includes(domain);
      },
      {
        message: 'Domínio de email não permitido',
        path: ['email'],
      },
    ),
  document: customValidators.cpf(),
});

// Schema principal de criação de pagamento
export const createPaymentSchema = z
  .object({
    amount: z
      .number()
      .positive('O valor deve ser positivo')
      .refine(val => val <= 1000000, 'Valor máximo permitido é R$ 1.000.000,00'),
    currency: z.enum(['BRL', 'USD', 'EUR'], {
      errorMap: () => ({
        message: 'Moeda inválida. Use BRL, USD ou EUR',
        code: ErrorCodes.VALIDATION.MOEDA_INVALIDA,
      }),
    }),
    description: z
      .string()
      .min(3, 'Descrição deve ter no mínimo 3 caracteres')
      .max(255, 'Descrição deve ter no máximo 255 caracteres')
      .transform(val => val.trim()),
    paymentMethod: z.enum(['credit_card', 'debit_card', 'pix', 'boleto'], {
      errorMap: () => ({
        message: 'Método de pagamento inválido',
        code: ErrorCodes.VALIDATION.METODO_PAGAMENTO,
      }),
    }),
    customer: customerSchema,
    card: cardSchema.optional(),
    metadata: z
      .record(z.string(), z.union([z.string(), z.number()]))
      .optional()
      .refine(
        val => {
          if (!val) return true;
          return Object.keys(val).length <= 10;
        },
        {
          message: 'Máximo de 10 metadados permitidos',
        },
      ),
    timezone: z
      .string()
      .regex(/^[A-Za-z_]+\/[A-Za-z_]+$/, 'Formato de timezone inválido')
      .optional(),
  })
  .refine(
    data => {
      if (data.paymentMethod === 'credit_card' || data.paymentMethod === 'debit_card') {
        return !!data.card;
      }
      return true;
    },
    {
      message: 'Dados do cartão são obrigatórios para pagamento com cartão',
      path: ['card'],
      code: ErrorCodes.VALIDATION.CARTAO_INVALIDO,
    },
  )
  .refine(
    data => {
      if (data.card) {
        const bin = data.card.number.substring(0, 6);
        return !['000000', '111111', '999999'].includes(bin);
      }
      return true;
    },
    {
      message: 'Cartão não aceito para transações',
      path: ['card.number'],
      code: 'ERR_BIN_BLOQUEADO',
    },
  );

// Schema para reembolso
export const refundPaymentSchema = z.object({
  reason: z
    .string()
    .min(3, 'Motivo deve ter no mínimo 3 caracteres')
    .max(255, 'Motivo deve ter no máximo 255 caracteres')
    .transform(val => val.trim()),
  amount: z.number().positive('Valor do reembolso deve ser positivo').optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type RefundPaymentInput = z.infer<typeof refundPaymentSchema>;
