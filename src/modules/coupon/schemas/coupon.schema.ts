import { z } from 'zod';

export const createCouponSchema = z.object({
  body: z.object({
    codigo: z.string().min(3).max(20),
    desconto: z.number().min(0).max(100),
    tipoDesconto: z.enum(['PERCENTUAL', 'VALOR_FIXO']),
    dataInicio: z.string().datetime(),
    dataFim: z.string().datetime(),
    quantidadeMaxima: z.number().int().positive().optional(),
    valorMinimoCompra: z.number().positive().optional(),
  }),
});

export const updateCouponSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    codigo: z.string().min(3).max(20).optional(),
    desconto: z.number().min(0).max(100).optional(),
    tipoDesconto: z.enum(['PERCENTUAL', 'VALOR_FIXO']).optional(),
    dataInicio: z.string().datetime().optional(),
    dataFim: z.string().datetime().optional(),
    quantidadeMaxima: z.number().int().positive().optional(),
    valorMinimoCompra: z.number().positive().optional(),
  }),
});

export const deleteCouponSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
});

export const getCouponByIdSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
});

export const getCouponByCodeSchema = z.object({
  params: z.object({
    codigo: z.string().min(3).max(20),
  }),
});

export const validateCouponSchema = z.object({
  body: z.object({
    codigo: z.string().min(3).max(20),
    valorTotal: z.number().positive(),
  }),
});

export const listCouponsSchema = z.object({
  query: z.object({
    page: z.string().transform((val) => parseInt(val, 10)).default('1'),
    limit: z.string().transform((val) => parseInt(val, 10)).default('10'),
    sortBy: z.enum(['codigo', 'desconto', 'dataInicio', 'dataFim', 'quantidadeMaxima']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
    status: z.enum(['ativo', 'inativo', 'expirado']).optional(),
    tipoDesconto: z.enum(['PERCENTUAL', 'VALOR_FIXO']).optional(),
    search: z.string().optional(),
  }),
});

export const updateCouponStatusSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
});

// Tipos exportados
export type CreateCouponInput = z.infer<typeof createCouponSchema>['body'];
export type UpdateCouponInput = z.infer<typeof updateCouponSchema>['body'];
export type CouponParams = z.infer<typeof getCouponByIdSchema>['params'];
export type CouponCodeParams = z.infer<typeof getCouponByCodeSchema>['params'];
export type ValidateCouponInput = z.infer<typeof validateCouponSchema>['body'];
export type ListCouponsQuery = z.infer<typeof listCouponsSchema>['query'];
export type UpdateCouponStatusParams = z.infer<typeof updateCouponStatusSchema>['params']; 