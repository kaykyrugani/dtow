export const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const;

export type HttpStatusCodeType = typeof HttpStatusCode[keyof typeof HttpStatusCode];

export const ERROR_MESSAGES = {
  // Autenticação
  USER_NOT_FOUND: 'Usuário não encontrado',
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  EMAIL_DUPLICATED: 'Já existe uma conta com este e-mail',
  INVALID_PASSWORD: 'Senha incorreta',
  TOKEN_EXPIRED: 'Token expirado',
  TOKEN_INVALID: 'Token inválido',
  
  // Validação
  VALIDATION_ERROR: 'Dados inválidos',
  INVALID_EMAIL: 'E-mail inválido',
  PASSWORD_TOO_SHORT: 'A senha deve ter no mínimo 6 caracteres',
  INVALID_USER_TYPE: 'Tipo de usuário inválido',
  
  // Recursos
  RECORD_NOT_FOUND: 'Registro não encontrado',
  DUPLICATE_ENTRY: 'Registro duplicado',
  
  // Servidor
  INTERNAL_ERROR: 'Erro interno do servidor',
  DATABASE_ERROR: 'Erro ao acessar o banco de dados'
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES; 