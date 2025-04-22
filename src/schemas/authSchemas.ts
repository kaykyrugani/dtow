import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const cadastroSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos'),
  tipoUsuario: z.enum(['cliente', 'admin']).default('cliente'),
});

export const recuperacaoSenhaSchema = z.object({
  email: z.string().email('Email inválido'),
});

export const alteracaoSenhaSchema = z.object({
  token: z.string(),
  novaSenha: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
});
