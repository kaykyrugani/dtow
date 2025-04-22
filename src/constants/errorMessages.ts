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
  AUTH_LIMIT_EXCEEDED: 'AUTH_LIMIT_EXCEEDED',

  // Erros de autenticação
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  CPF_ALREADY_EXISTS: 'CPF_ALREADY_EXISTS',
  INVALID_TOKEN: 'INVALID_TOKEN',

  // Erros de validação
  INVALID_INPUT: 'INVALID_INPUT',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',

  // Erros de banco de dados
  DATABASE_ERROR: 'DATABASE_ERROR',
  DATABASE_CONNECTION_ERROR: 'DATABASE_CONNECTION_ERROR',
  FOREIGN_KEY_CONSTRAINT: 'FOREIGN_KEY_CONSTRAINT',

  // Erros de servidor
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',

  // Erros de pagamento
  PAYMENT_ERROR: 'PAYMENT_ERROR',
  PAYMENT_INVALID: 'PAYMENT_INVALID',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  PAYMENT_CANCELLED: 'PAYMENT_CANCELLED',
  PAYMENT_REFUNDED: 'PAYMENT_REFUNDED',
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

export const ERROR_MESSAGES = {
  // Auth
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Credenciais inválidas',
  [ERROR_CODES.TOKEN_EXPIRED]: 'Token expirado',
  [ERROR_CODES.TOKEN_INVALID]: 'Token inválido',
  [ERROR_CODES.PASSWORD_INVALID]:
    'Senha deve conter pelo menos 6 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais',
  [ERROR_CODES.PASSWORD_CHANGED]: 'Senha alterada com sucesso',
  [ERROR_CODES.RECOVERY_EMAIL_SENT]:
    'Se o email existir, você receberá as instruções de recuperação',

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
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: 'Muitas requisições deste IP, tente novamente mais tarde',
  [ERROR_CODES.AUTH_LIMIT_EXCEEDED]:
    'Muitas tentativas de autenticação, tente novamente mais tarde',

  // Erros de autenticação
  [ERROR_CODES.USER_NOT_FOUND]: 'Usuário não encontrado',
  [ERROR_CODES.USER_ALREADY_EXISTS]: 'Usuário já existe',
  [ERROR_CODES.EMAIL_ALREADY_EXISTS]: 'Email já está em uso',
  [ERROR_CODES.CPF_ALREADY_EXISTS]: 'CPF já está em uso',
  [ERROR_CODES.INVALID_TOKEN]: 'Token inválido ou expirado',

  // Erros de validação
  [ERROR_CODES.INVALID_INPUT]: 'Dados de entrada inválidos',
  [ERROR_CODES.METHOD_NOT_ALLOWED]: 'Método não permitido',
  [ERROR_CODES.REQUEST_TIMEOUT]: 'Tempo limite da requisição excedido',

  // Erros de banco de dados
  [ERROR_CODES.DATABASE_ERROR]: 'Erro no banco de dados',
  [ERROR_CODES.DATABASE_CONNECTION_ERROR]: 'Erro de conexão com o banco de dados',
  [ERROR_CODES.FOREIGN_KEY_CONSTRAINT]: 'Violação de chave estrangeira',

  // Erros de servidor
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: 'Erro interno do servidor',
  [ERROR_CODES.SERVICE_UNAVAILABLE]: 'Serviço indisponível',

  // Erros de pagamento
  [ERROR_CODES.PAYMENT_ERROR]: 'Erro ao processar pagamento',
  [ERROR_CODES.PAYMENT_INVALID]: 'Pagamento inválido',
  [ERROR_CODES.PAYMENT_FAILED]: 'Falha no pagamento',
  [ERROR_CODES.PAYMENT_CANCELLED]: 'Pagamento cancelado',
  [ERROR_CODES.PAYMENT_REFUNDED]: 'Pagamento reembolsado',
} as const;

export type ErrorMessage = (typeof ERROR_MESSAGES)[ErrorCode];

export const getErrorMessage = (code: ErrorCode): string => {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR];
};
