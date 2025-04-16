import { z } from 'zod';

export const createAddressSchema = z.object({
  cep: z.string().regex(/^\d{8}$/, 'CEP inválido'),
  logradouro: z.string().min(3, 'Logradouro deve ter no mínimo 3 caracteres'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(2, 'Bairro deve ter no mínimo 2 caracteres'),
  cidade: z.string().min(2, 'Cidade deve ter no mínimo 2 caracteres'),
  estado: z.string().length(2, 'Estado deve ter 2 caracteres'),
  principal: z.boolean().optional().default(false),
});

export const updateAddressSchema = createAddressSchema.partial();

export type CreateAddressDTO = z.infer<typeof createAddressSchema>;
export type UpdateAddressDTO = z.infer<typeof updateAddressSchema>;

export interface AddressResponseDTO {
  id: number;
  usuarioId: number;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  principal: boolean;
  createdAt: Date;
  updatedAt: Date;
} 