import { injectable, inject } from 'tsyringe';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { AppError } from '../../../utils/AppError';
import { HttpStatusCode } from '../../../constants/httpCodes';
import { ERROR_CODES } from '../../../constants/errorMessages';
import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';
import { 
  PaymentPreferenceResponse, 
  PaymentPreferenceDTO, 
  WebhookDTO,
  paymentTypeMap 
} from '../dtos/payment.dto';
import { config } from '../../../config';
import { MetricsService } from '../../../services/metrics.service';
import { AuditService, AuditAction } from '../../../services/AuditService';
import { LoggingService } from '../../../services/LoggingService';

interface MercadoPagoPayment extends Payment {
  currency_id: string;
  payer?: {
    email?: string;
    name?: string;
    identification?: {
      number?: string;
    };
  };
}

/**
 * Serviço responsável por gerenciar todas as operações relacionadas a pagamentos
 * através da integração com o Mercado Pago.
 * 
 * @class PaymentService
 */
@injectable()
export class PaymentService {
  private static instance: PaymentService;
  private readonly SERVICE_NAME = 'payment';
  private readonly prisma: PrismaClient;
  private readonly mercadopago: MercadoPagoConfig;
  private readonly payment: Payment;
  private readonly MAX_RETRY_ATTEMPTS = 3;
  private readonly RETRY_DELAY = 1000; // 1 segundo

  constructor(
    @inject('PrismaClient')
    prisma: PrismaClient,
    @inject('MetricsService')
    private metricsService: MetricsService,
    @inject('AuditService')
    private auditService: AuditService,
    @inject('Payment')
    payment?: Payment
  ) {
    this.prisma = prisma;
    this.mercadopago = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
      options: { timeout: 5000 }
    });
    this.payment = payment || new Payment(this.mercadopago);
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService(
        new PrismaClient(),
        MetricsService.getInstance(),
        new AuditService(new PrismaClient(), LoggingService.getInstance()),
        new Payment(new MercadoPagoConfig({
          accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
          options: { timeout: 5000 }
        }))
      );
    }
    return PaymentService.instance;
  }

  /**
   * Cria uma preferência de pagamento no Mercado Pago.
   * 
   * @param {PaymentPreferenceDTO} data - Dados necessários para criar a preferência
   * @returns {Promise<PaymentPreferenceResponse>} Dados da preferência criada
   * @throws {AppError} Quando houver falha na criação da preferência
   */
  public async createPreference(data: PaymentPreferenceDTO): Promise<PaymentPreferenceResponse> {
    const startTime = Date.now();
    try {
      // Verificar se o pedido existe
      const pedido = await this.prisma.pedido.findUnique({
        where: { id: data.pedidoId },
      });

      if (!pedido) {
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ERROR_CODES.NOT_FOUND,
          'Pedido não encontrado'
        );
      }

      const preferenceData = {
        items: [{
          id: data.pedidoId,
          title: data.descricao,
          unit_price: data.valor,
          quantity: 1,
          currency_id: "BRL"
        }],
        payment_methods: {
          excluded_payment_types: [],
          installments: data.parcelas || 1,
          default_payment_method_id: paymentTypeMap[data.paymentType]
        },
        back_urls: {
          success: `${process.env.APP_URL}/payment/success`,
          failure: `${process.env.APP_URL}/payment/failure`,
          pending: `${process.env.APP_URL}/payment/pending`
        },
        external_reference: data.pedidoId,
        notification_url: `${process.env.APP_URL}/api/payment/webhook`,
        statement_descriptor: "ONLYWAVE",
        binary_mode: true,
        payer: {
          name: data.comprador.nome,
          email: data.comprador.email,
          identification: {
            type: "CPF",
            number: data.comprador.cpf
          }
        }
      };

      const mpResponse = await this.payment.create({ body: preferenceData });

      if (!mpResponse.id || !mpResponse.init_point) {
        throw new AppError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          ERROR_CODES.PAYMENT_ERROR,
          'Erro ao criar preferência de pagamento'
        );
      }

      // Atualizar o pedido com o ID da preferência
      await this.prisma.pedido.update({
        where: { id: data.pedidoId },
        data: {
          paymentId: mpResponse.id,
          status: 'PENDING',
          paymentType: data.paymentType,
          atualizadoEm: new Date()
        }
      });

      const response: PaymentPreferenceResponse = {
        id: mpResponse.id,
        init_point: mpResponse.init_point,
        valorOriginal: data.valor,
        valorFinal: data.valor,
        desconto: 0
      };

      const duration = Date.now() - startTime;
      MetricsService.observeCacheOperation(this.SERVICE_NAME, 'create_preference', duration);
      logger.info('Preferência de pagamento criada com sucesso', { 
        preferenceId: response.id,
        pedidoId: data.pedidoId
      });

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      MetricsService.observeCacheOperation(this.SERVICE_NAME, 'create_preference', duration);
      MetricsService.incrementCacheMiss(this.SERVICE_NAME, 'create_preference');
      logger.error('Erro ao criar preferência de pagamento:', error);
      throw error;
    }
  }

  /**
   * Verifica se um webhook já foi processado anteriormente
   * @param paymentId ID do pagamento
   * @returns true se o webhook já foi processado, false caso contrário
   */
  private async checkIdempotency(paymentId: string): Promise<boolean> {
    try {
      const webhookLog = await this.prisma.webhookLog.findUnique({
        where: { paymentId }
      });

      if (webhookLog) {
        logger.info(`Webhook já processado anteriormente: ${paymentId}`);
        return true;
      }

      return false;
    } catch (error) {
      logger.error(`Erro ao verificar idempotência do webhook: ${paymentId}`, { error });
      return false;
    }
  }

  /**
   * Salva o histórico de pagamento no banco de dados
   * @param payment Dados do pagamento
   */
  private async savePaymentHistory(payment: MercadoPagoPayment): Promise<void> {
    try {
      await this.prisma.payment.create({
        data: {
          paymentId: payment.id,
          externalReference: payment.external_reference,
          status: payment.status,
          paymentType: payment.payment_type_id,
          paymentMethod: payment.payment_method_id,
          amount: payment.transaction_amount,
          currency: payment.currency_id,
          payerEmail: payment.payer?.email,
          payerName: payment.payer?.name,
          payerDocument: payment.payer?.identification?.number,
          installments: payment.installments,
          processedAt: new Date()
        }
      });

      // Registra a ação de auditoria
      await this.auditService.log({
        action: AuditAction.PAYMENT_CREATED,
        entityId: payment.id,
        entityType: 'payment',
        details: {
          status: payment.status,
          amount: payment.transaction_amount,
          paymentType: payment.payment_type_id,
          externalReference: payment.external_reference
        }
      });

      logger.info(`Histórico de pagamento salvo: ${payment.id}`);
    } catch (error) {
      logger.error(`Erro ao salvar histórico de pagamento: ${payment.id}`, { error });
      throw new AppError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        ERROR_CODES.PAYMENT_ERROR,
        'Erro ao salvar histórico de pagamento'
      );
    }
  }

  /**
   * Processa um webhook recebido do Mercado Pago
   * @param data Dados do webhook
   * @returns Dados do pagamento processado
   */
  public async handleWebhook(data: WebhookDTO): Promise<Payment | null> {
    const startTime = Date.now();
    let attempt = 0;
    let lastError: Error | null = null;

    // Registra a recepção do webhook
    await this.auditService.log({
      action: AuditAction.WEBHOOK_RECEIVED,
      entityId: data.data.id,
      entityType: 'webhook',
      details: {
        action: data.action,
        data: data.data
      }
    });

    // Verifica idempotência
    const isDuplicate = await this.checkIdempotency(data.data.id);
    if (isDuplicate) {
      logger.info(`Webhook duplicado ignorado: ${data.data.id}`);
      return null;
    }

    while (attempt < this.MAX_RETRY_ATTEMPTS) {
      try {
        const { response: payment } = await this.payment.get({ id: data.data.id });

        if (!payment.external_reference) {
          logger.warn('Pagamento recebido sem external_reference', { paymentId: payment.id });
          return null;
        }

        // Salva o histórico do pagamento
        await this.savePaymentHistory(payment as MercadoPagoPayment);

        const pedidoId = payment.external_reference;
        const pedido = await this.prisma.pedido.update({
          where: { id: pedidoId },
          data: {
            status: this.mapPaymentStatus(payment.status),
            paymentStatus: payment.status,
            paymentType: payment.payment_type_id,
            paymentMethod: payment.payment_method_id,
            installments: payment.installments,
            transactionAmount: payment.transaction_amount,
            atualizadoEm: new Date()
          }
        });

        const duration = Date.now() - startTime;
        MetricsService.observeCacheOperation(this.SERVICE_NAME, 'handle_webhook', duration);
        
        logger.info('Webhook processado com sucesso', { 
          paymentId: payment.id,
          pedidoId,
          status: payment.status,
          attempt: attempt + 1
        });

        return payment;
      } catch (error) {
        lastError = error as Error;
        attempt++;

        if (attempt < this.MAX_RETRY_ATTEMPTS) {
          logger.warn('Tentativa de processar webhook falhou, tentando novamente', {
            error,
            attempt,
            paymentId: data.data.id
          });

          await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * attempt));
          continue;
        }

        logger.error('Erro ao processar webhook após todas as tentativas', { 
          error,
          attempt,
          paymentId: data.data.id
        });

        MetricsService.incrementCacheMiss(this.SERVICE_NAME, 'handle_webhook');
        throw new AppError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          ERROR_CODES.PAYMENT_ERROR,
          'Erro ao processar webhook'
        );
      }
    }

    throw lastError || new Error('Erro desconhecido ao processar webhook');
  }

  /**
   * Processa um reembolso de pagamento
   * @param paymentId ID do pagamento
   * @param amount Valor do reembolso (opcional)
   * @returns Dados do reembolso processado
   */
  public async reembolsarPagamento(paymentId: string, amount?: number): Promise<Payment> {
    const startTime = Date.now();
    let attempt = 0;
    let lastError: Error | null = null;

    // Registra a ação de auditoria
    await this.auditService.log({
      action: AuditAction.PAYMENT_REFUNDED,
      entityId: paymentId,
      entityType: 'payment',
      details: {
        amount,
        originalAmount: amount
      }
    });

    while (attempt < this.MAX_RETRY_ATTEMPTS) {
      try {
        // Verificar se o pagamento existe e está aprovado
        const payment = await this.payment.get({ id: paymentId });
        
        if (!payment) {
          throw new AppError(
            HttpStatusCode.NOT_FOUND,
            ERROR_CODES.NOT_FOUND,
            'Pagamento não encontrado'
          );
        }

        // Verificar se o pagamento está aprovado
        if (payment.status !== 'approved') {
          throw new AppError(
            HttpStatusCode.BAD_REQUEST,
            ERROR_CODES.PAYMENT_ERROR,
            'Pagamento não está aprovado para reembolso'
          );
        }

        // Verificar se o pagamento já está reembolsado
        if (payment.status === 'refunded') {
          throw new AppError(
            HttpStatusCode.BAD_REQUEST,
            ERROR_CODES.PAYMENT_ERROR,
            'Pagamento já está reembolsado'
          );
        }

        // Verificar se o valor do reembolso é válido
        if (amount && amount > payment.transaction_amount) {
          throw new AppError(
            HttpStatusCode.BAD_REQUEST,
            ERROR_CODES.PAYMENT_ERROR,
            'Valor do reembolso maior que o valor original'
          );
        }

        const refund = await this.payment.cancel(paymentId);

        // Atualizar o status do pedido
        if (payment.external_reference) {
          await this.prisma.pedido.update({
            where: { id: payment.external_reference },
            data: {
              status: 'REFUNDED',
              paymentStatus: 'refunded',
              atualizadoEm: new Date()
            }
          });
        }

        const duration = Date.now() - startTime;
        MetricsService.observeCacheOperation(this.SERVICE_NAME, 'refund_payment', duration);
        
        logger.info('Reembolso processado com sucesso', { 
          paymentId,
          amount,
          pedidoId: payment.external_reference
        });

        return refund;
      } catch (error) {
        lastError = error as Error;
        attempt++;

        if (attempt < this.MAX_RETRY_ATTEMPTS) {
          logger.warn('Tentativa de processar reembolso falhou, tentando novamente', {
            error,
            attempt,
            paymentId
          });

          await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * attempt));
          continue;
        }

        logger.error('Erro ao processar reembolso após todas as tentativas', { 
          error,
          attempt,
          paymentId
        });

        MetricsService.incrementCacheMiss(this.SERVICE_NAME, 'refund_payment');
        throw new AppError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          ERROR_CODES.PAYMENT_ERROR,
          'Erro ao processar reembolso'
        );
      }
    }

    throw lastError || new Error('Erro desconhecido ao processar reembolso');
  }

  /**
   * Mapeia o status do pagamento do Mercado Pago para o status do pedido
   */
  private mapPaymentStatus(mpStatus: string): string {
    const statusMap: { [key: string]: string } = {
      approved: 'PAID',
      pending: 'PENDING',
      rejected: 'REJECTED',
      cancelled: 'CANCELLED',
      refunded: 'REFUNDED',
      charged_back: 'CHARGEBACK'
    };

    return statusMap[mpStatus] || 'PENDING';
  }
} 