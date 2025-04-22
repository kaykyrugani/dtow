import { z } from 'zod';

export const createCouponSchema = z.object({
  codigo: z.string().min(3).max(20),
  desconto: z.number().min(0).max(100),
  tipoDesconto: z.enum(['PERCENTUAL', 'VALOR_FIXO']),
  valorMinimo: z.number().min(0).optional(),
  dataInicio: z.string().datetime(),
  dataFim: z.string().datetime(),
  limiteUsos: z.number().int().min(0).optional(),
  ativo: z.boolean().default(true),
});

export const updateCouponSchema = createCouponSchema.partial();

export type CreateCouponInput = z.infer<typeof createCouponSchema>;
export type UpdateCouponInput = z.infer<typeof updateCouponSchema>;
