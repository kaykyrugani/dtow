import { z } from 'zod';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errorMessages';
import { TipoUsuario } from '../types/usuario';
import { validarCPF, validarSenha } from '../utils/validation';

export const emailSchema = z.string()
  .email(ERROR_MESSAGES[ERROR_CODES.INVALID_EMAIL])
  .min(1, 'Email é obrigatório');

export const senhaSchema = z.string()
  .min(1, 'Senha é obrigatória')
  .refine(validarSenha, ERROR_MESSAGES[ERROR_CODES.PASSWORD_INVALID]);

export const cpfSchema = z.string()
  .length(11, ERROR_MESSAGES[ERROR_CODES.INVALID_CPF])
  .refine(validarCPF, ERROR_MESSAGES[ERROR_CODES.INVALID_CPF]);

export const tiposUsuarioValidos = ['ADMIN', 'CLIENTE'] as const;
export const tipoUsuarioEnum = z.enum(tiposUsuarioValidos, {
  errorMap: () => ({ message: ERROR_MESSAGES.VALIDATION_ERROR })
});

export const registerSchema = z.object({
  email: emailSchema,
  senha: senhaSchema,
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  cpf: cpfSchema,
  tipoUsuario: z.nativeEnum(TipoUsuario, {
    errorMap: () => ({ message: 'Tipo de usuário inválido' })
  })
});

export const loginSchema = z.object({
  email: emailSchema,
  senha: z.string().min(1, 'Senha é obrigatória')
});

export const recuperacaoSenhaSchema = z.object({
  email: emailSchema
});

export const alteracaoSenhaSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  novaSenha: senhaSchema
});

export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;
export type RecuperacaoSenhaDTO = z.infer<typeof recuperacaoSenhaSchema>;
export type AlteracaoSenhaDTO = z.infer<typeof alteracaoSenhaSchema>; 