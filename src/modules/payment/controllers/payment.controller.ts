import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { PaymentService } from '../services/payment.service';
import { AppError } from '../../../utils/AppError';
import { HttpStatusCode } from '../../../constants/httpCodes';
import { ERROR_CODES } from '../../../constants/errorMessages';
import { createPaymentPreferenceSchema, webhookSchema } from '../dtos/payment.dto';

export class PaymentController {
  private static paymentService = container.resolve(PaymentService);

  static async criarPreferencia(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = createPaymentPreferenceSchema.parse(req.body);
      const preference = await PaymentController.paymentService.criarPreferenciaCheckoutPro(validatedData);
      res.json(preference);
    } catch (error) {
      next(error);
    }
  }

  static async webhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = webhookSchema.parse(req.body);
      const result = await PaymentController.paymentService.processarWebhook(validatedData);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async consultarPagamento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { paymentId } = req.params;

      if (!paymentId) {
        throw new AppError(
          ERROR_CODES.VALIDATION_ERROR,
          HttpStatusCode.BAD_REQUEST,
          { message: 'ID do pagamento não fornecido' }
        );
      }

      const payment = await PaymentController.paymentService.consultarPagamento(paymentId);
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }

  static async reembolsarPagamento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { paymentId } = req.params;
      const { valor } = req.body;

      if (!paymentId) {
        throw new AppError(
          ERROR_CODES.VALIDATION_ERROR,
          HttpStatusCode.BAD_REQUEST,
          { message: 'ID do pagamento não fornecido' }
        );
      }

      await PaymentController.paymentService.reembolsarPagamento(paymentId, valor);
      res.json({ message: 'Pagamento reembolsado com sucesso' });
    } catch (error) {
      next(error);
    }
  }
} 