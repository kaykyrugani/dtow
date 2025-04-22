export interface ErrorDetail {
  campo: string;
  codigo: string;
  mensagem: string;
  exemplo_valido?: string;
  sugestao?: string;
  tempo_espera?: number;
}

export interface ErrorResponse {
  requestId: string;
  timestamp: string;
  erros: ErrorDetail[];
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly field?: string;
  public readonly requestId?: string;
  public readonly exemploValido?: string;
  public readonly sugestao?: string;
  public readonly tempoEspera?: number;

  constructor({
    statusCode = 400,
    code = 'ERR_UNKNOWN',
    message = 'Erro desconhecido',
    field,
    requestId,
    exemploValido,
    sugestao,
    tempoEspera,
  }: {
    statusCode?: number;
    code?: string;
    message?: string;
    field?: string;
    requestId?: string;
    exemploValido?: string;
    sugestao?: string;
    tempoEspera?: number;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.field = field;
    this.requestId = requestId;
    this.exemploValido = exemploValido;
    this.sugestao = sugestao;
    this.tempoEspera = tempoEspera;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  public toResponse(): ErrorResponse {
    return {
      requestId: this.requestId || 'N/A',
      timestamp: new Date().toISOString(),
      erros: [
        {
          campo: this.field || 'unknown',
          codigo: this.code,
          mensagem: this.message,
          exemplo_valido: this.exemploValido,
          sugestao: this.sugestao,
          tempo_espera: this.tempoEspera,
        },
      ],
    };
  }
}

export class ValidationError extends AppError {
  constructor(
    field: string,
    code: string,
    message: string,
    options?: {
      requestId?: string;
      exemploValido?: string;
      sugestao?: string;
      tempoEspera?: number;
    },
  ) {
    super({
      statusCode: 422,
      code,
      message,
      field,
      ...options,
    });
  }
}

export class PaymentError extends AppError {
  constructor(
    code: string,
    message: string,
    options?: {
      requestId?: string;
      exemploValido?: string;
      sugestao?: string;
      tempoEspera?: number;
    },
  ) {
    super({
      statusCode: 400,
      code,
      message,
      ...options,
    });
  }
}

export class SecurityError extends AppError {
  constructor(
    code: string,
    message: string,
    options?: {
      requestId?: string;
      exemploValido?: string;
      sugestao?: string;
      tempoEspera?: number;
    },
  ) {
    super({
      statusCode: 403,
      code,
      message,
      ...options,
    });
  }
}
