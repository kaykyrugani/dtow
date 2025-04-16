export const ERROR_CODES = {
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    status: 400,
    message: 'Dados inválidos',
  },
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    status: 401,
    message: 'Credenciais inválidas',
  },
  DUPLICATE_ENTRY: {
    code: 'DUPLICATE_ENTRY',
    status: 409,
    message: 'Registro já existe',
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    status: 500,
    message: 'Erro interno do servidor',
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    status: 404,
    message: 'Recurso não encontrado',
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    status: 401,
    message: 'Não autorizado',
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    status: 403,
    message: 'Acesso negado',
  },
  EXTERNAL_SERVICE_ERROR: {
    code: 'EXTERNAL_SERVICE_ERROR',
    status: 502,
    message: 'Erro em serviço externo',
  },
  RATE_LIMIT_EXCEEDED: {
    code: 'RATE_LIMIT_EXCEEDED',
    status: 429,
    message: 'Limite de requisições excedido',
  },
  INVALID_TOKEN: {
    code: 'INVALID_TOKEN',
    status: 401,
    message: 'Token inválido',
  },
  TOKEN_EXPIRED: {
    code: 'TOKEN_EXPIRED',
    status: 401,
    message: 'Token expirado',
  },
  INVALID_2FA_CODE: {
    code: 'INVALID_2FA_CODE',
    status: 401,
    message: 'Código 2FA inválido',
  },
  PAYMENT_ERROR: {
    code: 'PAYMENT_ERROR',
    status: 400,
    message: 'Erro no processamento do pagamento',
  },
  INSUFFICIENT_STOCK: {
    code: 'INSUFFICIENT_STOCK',
    status: 400,
    message: 'Estoque insuficiente',
  },
  INVALID_COUPON: {
    code: 'INVALID_COUPON',
    status: 400,
    message: 'Cupom inválido',
  },
  EXPIRED_COUPON: {
    code: 'EXPIRED_COUPON',
    status: 400,
    message: 'Cupom expirado',
  },
  ORDER_CANCELLED: {
    code: 'ORDER_CANCELLED',
    status: 400,
    message: 'Pedido já cancelado',
  },
  ORDER_DELIVERED: {
    code: 'ORDER_DELIVERED',
    status: 400,
    message: 'Pedido já entregue',
  },
} as const;

export type ErrorCode = keyof typeof ERROR_CODES; 