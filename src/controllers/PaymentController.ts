import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { PaymentService } from '../services/PaymentService';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpCodes';
import { ERROR_CODES } from '../constants/errorMessages';

export class PaymentController {
  private static paymentService = container.resolve(PaymentService);

  static async criarPreferencia(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { pedidoId, valor, descricao } = req.body;

      if (!pedidoId || !valor || !descricao) {
        throw new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST, {
          message: 'Dados incompletos para criar preferência de pagamento',
        });
      }

      const preference = await PaymentController.paymentService.criarPreferenciaCheckoutPro(
        pedidoId,
        valor,
        descricao,
      );

      res.json(preference);
    } catch (error) {
      next(error);
    }
  }

  static async webhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await PaymentController.paymentService.processarWebhook(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
