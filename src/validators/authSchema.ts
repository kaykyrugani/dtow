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

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>; 