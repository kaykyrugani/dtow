import { TipoUsuario } from '../../types/usuario';

export const users = {
  valid: {
    id: '1',
    email: 'test@example.com',
    senha: 'Test123@',
    nome: 'Test User',
    cpf: '12345678909',
    tipoUsuario: TipoUsuario.ADMIN,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  invalid: {
    email: 'invalid-email',
    senha: '123',
    nome: 'Te',
    cpf: '123',
    tipoUsuario: 'INVALID' as TipoUsuario
  }
} as const;

export const loginData = {
  valid: {
    email: users.valid.email,
    senha: users.valid.senha
  },
  invalid: {
    email: users.invalid.email,
    senha: users.invalid.senha
  }
} as const;

export const tokens = {
  valid: {
    accessToken: 'valid_access_token',
    refreshToken: 'valid_refresh_token',
    resetToken: 'valid_reset_token'
  },
  invalid: {
    accessToken: 'invalid_access_token',
    refreshToken: 'invalid_refresh_token',
    resetToken: 'invalid_reset_token'
  },
  expired: {
    accessToken: 'expired_access_token',
    refreshToken: 'expired_refresh_token',
    resetToken: 'expired_reset_token'
  }
} as const; 