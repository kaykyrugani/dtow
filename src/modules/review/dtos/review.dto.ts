import { z } from 'zod';

export const createReviewSchema = z.object({
  nota: z.number().min(1).max(5),
  comentario: z.string().optional(),
});

export const updateReviewSchema = z.object({
  nota: z.number().min(1).max(5).optional(),
  comentario: z.string().optional(),
  status: z.enum(['PENDENTE', 'APROVADA', 'REJEITADA']).optional(),
});

export type CreateReviewDTO = z.infer<typeof createReviewSchema>;
export type UpdateReviewDTO = z.infer<typeof updateReviewSchema>;

export interface ReviewResponse {
  id: string;
  nota: number;
  comentario?: string;
  status: 'PENDENTE' | 'APROVADA' | 'REJEITADA';
  createdAt: Date;
  updatedAt: Date;
  usuario: {
    id: string;
    nome: string;
  };
  produto: {
    id: string;
    nome: string;
  };
} 