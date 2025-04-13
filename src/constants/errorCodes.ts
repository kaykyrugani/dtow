export const ERROR_CODES = {
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    status: 400,
    message: 'Dados inválidos'
  },
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    status: 401,
    message: 'Credenciais inválidas'
  },
  DUPLICATE_ENTRY: {
    code: 'DUPLICATE_ENTRY',
    status: 400,
    message: 'Registro duplicado'
  },
  INTERNAL_ERROR: {
    code: 'INTERNAL_ERROR',
    status: 500,
    message: 'Erro interno do servidor'
  }
} as const;

export type ErrorCode = keyof typeof ERROR_CODES; 