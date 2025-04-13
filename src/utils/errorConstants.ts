export const ErrorMessages = {
  // Erros de Autenticação
  INVALID_TOKEN: 'Token inválido ou expirado',
  MISSING_TOKEN: 'Token não fornecido',
  UNAUTHORIZED: 'Não autorizado',
  
  // Erros de Dados
  RECORD_NOT_FOUND: 'Registro não encontrado',
  DUPLICATE_ENTRY: 'Registro duplicado',
  INVALID_DATA: 'Dados inválidos',
  VALIDATION_ERROR: 'Erro de validação',
  
  // Erros de Sistema
  INTERNAL_ERROR: 'Erro interno do servidor',
  DATABASE_ERROR: 'Erro ao acessar o banco de dados',
  TIMEOUT_ERROR: 'Tempo limite da requisição excedido',
  
  // Erros de Negócio
  INSUFFICIENT_PERMISSIONS: 'Permissões insuficientes',
  RESOURCE_LOCKED: 'Recurso bloqueado ou em uso',
  INVALID_OPERATION: 'Operação inválida'
} as const;

export type ErrorCode = keyof typeof ErrorMessages;

export const PrismaErrorCodes = {
  UNIQUE_CONSTRAINT: 'P2002',
  FOREIGN_KEY_CONSTRAINT: 'P2003',
  NOT_FOUND: 'P2025',
  REQUIRED_FIELD: 'P2011'
} as const; 