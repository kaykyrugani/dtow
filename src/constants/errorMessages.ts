export const ERROR_MESSAGES = {
  EMAIL_DUPLICATED: 'Já existe uma conta com este e-mail',
  INVALID_PASSWORD: 'Senha inválida',
  INTERNAL_ERROR: 'Erro interno do servidor',
  NOT_FOUND: 'Registro não encontrado',
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  VALIDATION_ERROR: 'Erro de validação',
  TOKEN_EXPIRED: 'Token expirado',
  UNAUTHORIZED: 'Não autorizado',
  RATE_LIMIT_EXCEEDED: 'Muitas requisições. Tente novamente mais tarde',
  AUTH_LIMIT_EXCEEDED: 'Muitas tentativas. Tente novamente em 1 hora'
} as const;

export const ERROR_CODES = {
  DUPLICATE_ENTRY: 'P2002',
  NOT_FOUND: 'P2025',
  VALIDATION_ERROR: 'P2001',
  INVALID_CREDENTIALS: 'AUTH001',
  INVALID_TOKEN: 'AUTH002',
  MISSING_TOKEN: 'AUTH003'
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
export type ErrorCodeKey = keyof typeof ERROR_CODES;

export const getErrorMessage = (code: ErrorCodeKey): string => {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES.INTERNAL_ERROR;
}; 