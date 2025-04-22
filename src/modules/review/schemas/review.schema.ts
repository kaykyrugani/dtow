import { z } from 'zod';

// Schema para criação de avaliação
export const createReviewSchema = z.object({
  body: z.object({
    nota: z.number().min(1).max(5),
    comentario: z.string().min(3).max(500),
    produtoId: z.number().int().positive(),
  }),
});

// Schema para atualização de avaliação
export const updateReviewSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val, 10)),
  }),
  body: z.object({
    nota: z.number().min(1).max(5).optional(),
    comentario: z.string().min(3).max(500).optional(),
  }),
});

// Schema para exclusão de avaliação
export const deleteReviewSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val, 10)),
  }),
});

// Schema para buscar avaliação por ID
export const getReviewByIdSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val, 10)),
  }),
});

// Schema para buscar avaliações por produto
export const getReviewsByProductSchema = z.object({
  params: z.object({
    produtoId: z.string().transform(val => parseInt(val, 10)),
  }),
  query: z.object({
    page: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 10)),
  }),
});

// Schema para buscar avaliações por usuário
export const getReviewsByUserSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 10)),
  }),
});

// Tipos exportados
export type CreateReviewInput = z.infer<typeof createReviewSchema>['body'];
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>['body'];
export type ReviewParams = z.infer<typeof getReviewByIdSchema>['params'];
export type ReviewQuery = z.infer<typeof getReviewsByProductSchema>['query'];
