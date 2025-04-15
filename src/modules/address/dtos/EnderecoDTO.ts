import { z } from 'zod';

export const enderecoSchema = z.object({
  cep: z.string()
    .length(8, 'CEP deve ter exatamente 8 dígitos')
    .regex(/^\d+$/, 'CEP deve conter apenas números'),
  logradouro: z.string().min(1, 'Logradouro é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  uf: z.string().length(2, 'UF deve ter 2 caracteres'),
  usuarioId: z.string().uuid('ID do usuário inválido')
});

export type EnderecoDTO = z.infer<typeof enderecoSchema>;

export const consultaCepSchema = z.object({
  cep: z.string()
    .length(8, 'CEP deve ter exatamente 8 dígitos')
    .regex(/^\d+$/, 'CEP deve conter apenas números')
});

export interface ConsultaCepDTO {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
} 