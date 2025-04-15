import { injectable } from 'tsyringe';
import mercadopago from 'mercadopago';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpCodes';
import { ERROR_CODES } from '../constants/errorMessages';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

@injectable()
export class PaymentService {
  constructor(private prisma: PrismaClient) {
    // Configuração do Mercado Pago
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
    });
  }

  async criarPreferenciaCheckoutPro(pedidoId: string, valor: number, descricao: string) {
    try {
      const preference = {
        items: [
          {
            title: descricao,
            unit_price: valor,
            quantity: 1,
          },
        ],
        back_urls: {
          success: `${process.env.FRONTEND_URL}/pedidos/${pedidoId}/sucesso`,
          failure: `${process.env.FRONTEND_URL}/pedidos/${pedidoId}/falha`,
          pending: `${process.env.FRONTEND_URL}/pedidos/${pedidoId}/pendente`,
        },
        external_reference: pedidoId,
        notification_url: `${process.env.API_URL}/webhooks/mercadopago`,
      };

      const response = await mercadopago.preferences.create(preference);

      // Atualiza o pedido com o ID da preferência
      await this.prisma.pedido.update({
        where: { id: pedidoId },
        data: {
          paymentId: response.body.id,
          status: 'PENDENTE',
        },
      });

      logger.info(`Preferência de pagamento criada para o pedido ${pedidoId}`);

      return {
        id: response.body.id,
        init_point: response.body.init_point,
      };
    } catch (error) {
      logger.error(`Erro ao criar preferência de pagamento: ${error}`);
      throw new AppError(
        ERROR_CODES.PAYMENT_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        { message: 'Erro ao criar preferência de pagamento' }
      );
    }
  }

  async processarWebhook(data: any) {
    try {
      const { action, data: webhookData } = data;

      if (action === 'payment.created' || action === 'payment.updated') {
        const payment = await mercadopago.payment.findById(webhookData.id);
        const pedidoId = payment.body.external_reference;

        // Atualiza o status do pedido
        await this.prisma.pedido.update({
          where: { id: pedidoId },
          data: {
            status: this.mapPaymentStatus(payment.body.status),
            paymentStatus: payment.body.status,
            paymentDetails: payment.body,
          },
        });

        logger.info(`Status do pedido ${pedidoId} atualizado para ${payment.body.status}`);
      }

      return { success: true };
    } catch (error) {
      logger.error(`Erro ao processar webhook: ${error}`);
      throw new AppError(
        ERROR_CODES.PAYMENT_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        { message: 'Erro ao processar webhook' }
      );
    }
  }

  private mapPaymentStatus(mpStatus: string): string {
    const statusMap: { [key: string]: string } = {
      approved: 'PAGO',
      pending: 'PENDENTE',
      rejected: 'REJEITADO',
      cancelled: 'CANCELADO',
      refunded: 'REEMBOLSADO',
    };

    return statusMap[mpStatus] || 'PENDENTE';
  }
} 