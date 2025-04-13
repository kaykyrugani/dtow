export const ERROR_MESSAGES = {
  // Autenticação
  EMAIL_DUPLICATED: 'Já existe uma conta com este e-mail',
  INVALID_PASSWORD: 'Senha inválida',
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  TOKEN_EXPIRED: 'Token expirado',
  TOKEN_INVALID: 'Token inválido',
  UNAUTHORIZED: 'Não autorizado',
  
  // Validação
  VALIDATION_ERROR: 'Erro de validação',
  
  // Recursos
  NOT_FOUND: 'Registro não encontrado',
  
  // Limites
  RATE_LIMIT_EXCEEDED: 'Muitas requisições. Tente novamente mais tarde',
  AUTH_LIMIT_EXCEEDED: 'Muitas tentativas. Tente novamente em 1 hora',
  
  // Sistema
  INTERNAL_ERROR: 'Erro interno do servidor'
} as const;

export const ERROR_CODES = {
  // Prisma
  DUPLICATE_ENTRY: 'P2002',
  NOT_FOUND: 'P2025',
  VALIDATION_ERROR: 'P2001',
  
  // Auth
  INVALID_CREDENTIALS: 'AUTH001',
  TOKEN_INVALID: 'AUTH002',
  TOKEN_EXPIRED: 'AUTH003',
  UNAUTHORIZED: 'AUTH004',
  
  // Sistema
  INTERNAL_ERROR: 'SYS001',
  RATE_LIMIT: 'SYS002'
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
export type ErrorCodeKey = keyof typeof ERROR_CODES;

export const getErrorMessage = (code: ErrorCodeKey): string => {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES.INTERNAL_ERROR;
}; 