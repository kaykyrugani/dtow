import { z } from 'zod';

export const createPaymentPreferenceSchema = z.object({
  body: z.object({
    pedidoId: z.string().uuid('ID do pedido inválido'),
    valor: z.number().positive('Valor deve ser positivo'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    tipo: z.enum(['CREDIT_CARD', 'PIX', 'BANK_SLIP'], {
      errorMap: () => ({ message: 'Tipo de pagamento inválido' })
    })
  })
}); 