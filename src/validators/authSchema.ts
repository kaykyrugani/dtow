import { z } from 'zod';

export const tiposUsuarioValidos = ['ADMIN', 'CLIENTE'] as const;
export const tipoUsuarioEnum = z.enum(tiposUsuarioValidos);

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  tipoUsuario: tipoUsuarioEnum
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>; 