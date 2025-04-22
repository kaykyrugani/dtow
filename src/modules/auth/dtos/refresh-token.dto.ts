import { z } from 'zod';

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'O refresh token é obrigatório'),
});

export type RefreshTokenDTO = z.infer<typeof refreshTokenSchema>;
