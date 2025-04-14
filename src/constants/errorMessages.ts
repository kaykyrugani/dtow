export const ERROR_CODES = {
  // Auth
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  PASSWORD_INVALID: 'PASSWORD_INVALID',
  PASSWORD_CHANGED: 'PASSWORD_CHANGED',
  RECOVERY_EMAIL_SENT: 'RECOVERY_EMAIL_SENT',
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  INVALID_CPF: 'INVALID_CPF',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_NAME: 'INVALID_NAME',
  
  // Resource
  NOT_FOUND: 'NOT_FOUND',
  
  // System
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  
  // Rate Limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  AUTH_LIMIT_EXCEEDED: 'AUTH_LIMIT_EXCEEDED'
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

export const ERROR_MESSAGES = {
  // Auth
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Credenciais inválidas',
  [ERROR_CODES.TOKEN_EXPIRED]: 'Token expirado',
  [ERROR_CODES.TOKEN_INVALID]: 'Token inválido',
  [ERROR_CODES.PASSWORD_INVALID]: 'Senha deve conter pelo menos 6 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais',
  [ERROR_CODES.PASSWORD_CHANGED]: 'Senha alterada com sucesso',
  [ERROR_CODES.RECOVERY_EMAIL_SENT]: 'Se o email existir, você receberá as instruções de recuperação',
  
  // Validation
  [ERROR_CODES.VALIDATION_ERROR]: 'Erro de validação',
  [ERROR_CODES.DUPLICATE_ENTRY]: 'Registro duplicado',
  [ERROR_CODES.INVALID_CPF]: 'CPF inválido',
  [ERROR_CODES.INVALID_EMAIL]: 'Email inválido',
  [ERROR_CODES.INVALID_NAME]: 'Nome deve ter no mínimo 3 caracteres',
  
  // Resource
  [ERROR_CODES.NOT_FOUND]: 'Registro não encontrado',
  
  // System
  [ERROR_CODES.INTERNAL_ERROR]: 'Erro interno do servidor',
  [ERROR_CODES.UNAUTHORIZED]: 'Não autorizado',
  [ERROR_CODES.FORBIDDEN]: 'Acesso negado',
  
  // Rate Limiting
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: 'Muitas requisições. Tente novamente mais tarde',
  [ERROR_CODES.AUTH_LIMIT_EXCEEDED]: 'Muitas tentativas. Tente novamente em 1 hora'
} as const;

export type ErrorMessage = typeof ERROR_MESSAGES[ErrorCode];

export const getErrorMessage = (code: ErrorCode): string => {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR];
}; 