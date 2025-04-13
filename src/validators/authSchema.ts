import { z } from 'zod';
import { ERROR_MESSAGES } from '../constants/errorMessages';

const passwordSchema = z.string()
  .min(8, ERROR_MESSAGES.INVALID_PASSWORD)
  .regex(/[A-Z]/, 'Senha deve conter uma letra maiúscula')
  .regex(/[a-z]/, 'Senha deve conter uma letra minúscula')
  .regex(/[0-9]/, 'Senha deve conter um número');

export const tiposUsuarioValidos = ['ADMIN', 'CLIENTE'] as const;
export const tipoUsuarioEnum = z.enum(tiposUsuarioValidos);

export const registerSchema = z.object({
  email: z.string().email(ERROR_MESSAGES.VALIDATION_ERROR),
  nome: z.string().min(3, ERROR_MESSAGES.VALIDATION_ERROR),
  senha: passwordSchema,
  tipoUsuario: tipoUsuarioEnum
});

export const loginSchema = z.object({
  email: z.string().email(ERROR_MESSAGES.VALIDATION_ERROR),
  senha: passwordSchema
});

export const recuperacaoSenhaSchema = z.object({
  email: z.string().email('E-mail inválido')
});

export const alteracaoSenhaSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  novaSenha: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres')
});

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;
export type RecuperacaoSenhaDTO = z.infer<typeof recuperacaoSenhaSchema>;
export type AlteracaoSenhaDTO = z.infer<typeof alteracaoSenhaSchema>; 