import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'A senha atual é obrigatória'),
    newPassword: z.string().min(8, 'A nova senha deve ter no mínimo 8 caracteres'),
    confirmNewPassword: z.string().min(1, 'A confirmação da nova senha é obrigatória'),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não conferem',
    path: ['confirmNewPassword'],
  });

export type ChangePasswordDTO = z.infer<typeof changePasswordSchema>;
