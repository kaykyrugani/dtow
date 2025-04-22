export const ErrorMessages = {
  // Erros de Autenticação
  INVALID_TOKEN: 'Token inválido',
  MISSING_TOKEN: 'Token não fornecido',
  UNAUTHORIZED: 'Não autorizado',

  // Erros de Dados
  RECORD_NOT_FOUND: 'Registro não encontrado',
  DUPLICATE_ENTRY: 'Registro duplicado',
  INVALID_DATA: 'Dados inválidos',
  VALIDATION_ERROR: 'Erro de validação',

  // Erros de Sistema
  INTERNAL_ERROR: 'Erro interno do servidor',
  DATABASE_ERROR: 'Erro de banco de dados',
  TIMEOUT_ERROR: 'Tempo limite excedido',

  // Erros de Negócio
  INSUFFICIENT_PERMISSIONS: 'Permissões insuficientes',
  RESOURCE_LOCKED: 'Recurso bloqueado',
  INVALID_OPERATION: 'Operação inválida',
  INVALID_CREDENTIALS: 'Credenciais inválidas',
} as const;

export type ErrorCode = keyof typeof ErrorMessages;

export const PrismaErrorCodes = {
  DUPLICATE_ENTRY: 'P2002',
  NOT_FOUND: 'P2025',
  VALIDATION_ERROR: 'P2001',
} as const;

export type PrismaErrorCode = (typeof PrismaErrorCodes)[keyof typeof PrismaErrorCodes];
