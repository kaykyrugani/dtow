import { z } from 'zod';
import { OrderStatus, PaymentType } from '@prisma/client';

export const createOrderItemSchema = z.object({
  productId: z.number().int().positive('ID do produto inválido'),
  quantity: z.number().int().min(1, 'Quantidade deve ser maior que zero'),
  tamanho: z.string().min(1, 'Tamanho é obrigatório'),
});

export const createOrderSchema = z.object({
  items: z.array(createOrderItemSchema).min(1, 'Pedido deve ter pelo menos um item'),
  cupomId: z.number().int().positive('ID do cupom inválido').optional(),
  endereco: z.string().min(10, 'Endereço deve ter no mínimo 10 caracteres'),
  pagamento: z.enum(['CREDIT_CARD', 'PIX', 'BANK_SLIP'] as const, {
    errorMap: () => ({ message: 'Método de pagamento inválido' }),
  }),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const, {
    errorMap: () => ({ message: 'Status inválido' }),
  }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
