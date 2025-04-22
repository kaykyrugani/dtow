import { z } from 'zod';

export const createProductSchema = z.object({
  nome: z.string().min(3).max(255),
  descricao: z.string().min(10).max(1000),
  preco: z.number().positive(),
  estoque: z.number().int().positive(),
  imagem: z.string().url(),
  categoria: z.string().min(3).max(50),
  subcategoria: z.string().min(3).max(50).optional(),
  marca: z.string().min(1).max(100),
  imagens: z.string(),
  tamanhos: z.string(),
});

export const updateProductSchema = createProductSchema.partial();
