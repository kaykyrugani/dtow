export const ERROR_MESSAGES = {
  INVALID_TOKEN: 'Token inválido',
  MISSING_TOKEN: 'Token não fornecido',
  UNAUTHORIZED: 'Não autorizado',
  RECORD_NOT_FOUND: 'Registro não encontrado',
  DUPLICATE_ENTRY: 'Registro duplicado',
  INVALID_DATA: 'Dados inválidos',
  VALIDATION_ERROR: 'Erro de validação',
  INTERNAL_ERROR: 'Erro interno do servidor',
  DATABASE_ERROR: 'Erro de banco de dados',
  TIMEOUT_ERROR: 'Tempo limite excedido',
  INSUFFICIENT_PERMISSIONS: 'Permissões insuficientes',
  RESOURCE_LOCKED: 'Recurso bloqueado',
  INVALID_OPERATION: 'Operação inválida',
  INVALID_CREDENTIALS: 'Credenciais inválidas'
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