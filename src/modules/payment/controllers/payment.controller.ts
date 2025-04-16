import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { PaymentService } from '../services/payment.service';
import { PaymentPreferenceDTO, WebhookDTO, RefundDTO } from '../dtos/payment.dto';
import { logger } from '../../../config/logger';
import { AppError } from '../../../utils/AppError';
import { HttpStatusCode } from '../../../constants/httpCodes';
import { ERROR_CODES } from '../../../constants/errorMessages';

export class PaymentController {
  private static instance: PaymentController;
  private paymentService: PaymentService;

  private constructor() {
    this.paymentService = PaymentService.getInstance();
  }

  public static getInstance(): PaymentController {
    if (!PaymentController.instance) {
      PaymentController.instance = new PaymentController();
    }
    return PaymentController.instance;
  }

  /**
   * Cria uma preferência de pagamento no Mercado Pago
   */
  public async createPreference(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body as PaymentPreferenceDTO;
      const result = await this.paymentService.createPreference(data);
      return res.json(result);
    } catch (error) {
      logger.error('Erro ao criar preferência:', error);
      
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          error: error.message,
          code: error.code
        });
      }

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: 'Erro ao criar preferência de pagamento',
        code: ERROR_CODES.PAYMENT_ERROR
      });
    }
  }

  /**
   * Processa notificações de webhook do Mercado Pago
   */
  public async handleWebhook(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body as WebhookDTO;
      await this.paymentService.handleWebhook(data);
      return res.json({ success: true });
    } catch (error) {
      logger.error('Erro ao processar webhook:', error);
      
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          error: error.message,
          code: error.code
        });
      }

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: 'Erro ao processar webhook',
        code: ERROR_CODES.PAYMENT_ERROR
      });
    }
  }

  /**
   * Processa o reembolso de um pagamento
   */
  public async reembolsarPagamento(req: Request, res: Response): Promise<Response> {
    try {
      const { paymentId } = req.params;
      const data = req.body as RefundDTO;
      
      await this.paymentService.reembolsarPagamento(paymentId, data.amount);
      return res.json({ success: true });
    } catch (error) {
      logger.error('Erro ao processar reembolso:', error);
      
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          error: error.message,
          code: error.code
        });
      }

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: 'Erro ao processar reembolso',
        code: ERROR_CODES.PAYMENT_ERROR
      });
    }
  }
} 