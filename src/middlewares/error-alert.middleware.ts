import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { AlertService } from '../services/AlertService';

export const errorAlertMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const alertService = container.resolve(AlertService);

  // Verifica se é um erro HTTP
  if ('statusCode' in err) {
    const statusCode = (err as any).statusCode;

    // Alerta para erros 5xx (servidor)
    if (statusCode >= 500) {
      await alertService.checkAlert('high_error_rate', 1);
    }

    // Alerta para erros 4xx (cliente)
    if (statusCode >= 400 && statusCode < 500) {
      await alertService.checkAlert('client_error_rate', 1);
    }
  }

  // Alerta para erros não tratados
  if (!('statusCode' in err)) {
    await alertService.checkAlert('unhandled_error_rate', 1);
  }

  next(err);
};
