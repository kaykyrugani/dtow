import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { PaymentServiceImpl } from '../services/payment.service';
import { PaymentPreferenceDTO, WebhookDTO, RefundDTO } from '../dtos/payment.dto';
import { logger } from '../../../config/logger';
import { AppError } from '../../../utils/AppError';
import { HttpStatusCode } from '../../../constants/httpCodes';
import { ERROR_CODES } from '../../../constants/errorMessages';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseMiddleware,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { WebhookData } from '../interfaces/webhook-data.interface';
import { validateSchema } from '../../../middlewares/sanitization.middleware';
import { createPaymentSchema, refundPaymentSchema } from '../schemas/payment.schema';
import { CreatePaymentInput, RefundPaymentInput } from '../schemas/payment.schema';
import { ValidationMiddleware } from '../../../middlewares/validation.middleware';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Payment } from '../entities/payment.entity';
import { WebhookDto } from '../dto/webhook.dto';
import { RefundDto } from '../dto/refund.dto';
import { PaymentResponseDto } from '../dto/payment-response.dto';
import { RefundResponseDto } from '../dto/refund-response.dto';
import { WebhookResponseDto } from '../dto/webhook-response.dto';

@ApiTags('Pagamentos')
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentServiceImpl,
    private readonly validationMiddleware: ValidationMiddleware,
  ) {}

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
          code: error.code,
        });
      }

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: 'Erro ao criar preferência de pagamento',
        code: ERROR_CODES.PAYMENT_ERROR,
      });
    }
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Processa um webhook de pagamento' })
  @ApiResponse({
    status: 201,
    description: 'Webhook processado com sucesso',
    type: WebhookResponseDto,
  })
  async processWebhook(@Body() webhookDto: WebhookDto): Promise<WebhookResponseDto> {
    return this.paymentService.processWebhook(webhookDto);
  }

  @Post()
  async createPayment(@Body() data: CreatePaymentInput) {
    await this.validationMiddleware.canActivate({
      switchToHttp: () => ({
        getRequest: () => ({ body: data }),
      }),
    } as any);
    return this.paymentService.processPayment(data);
  }

  @Post(':id/refund')
  @ApiOperation({ summary: 'Realiza o reembolso de um pagamento' })
  @ApiResponse({
    status: 201,
    description: 'Reembolso realizado com sucesso',
    type: RefundResponseDto,
  })
  async refundPayment(
    @Param('id') id: string,
    @Body() refundDto: RefundDto,
  ): Promise<RefundResponseDto> {
    return this.paymentService.refundPayment(id, refundDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um pagamento pelo ID' })
  @ApiResponse({ status: 200, description: 'Pagamento encontrado', type: PaymentResponseDto })
  async getPaymentById(@Param('id') id: string): Promise<PaymentResponseDto> {
    return this.paymentService.getPaymentById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Lista pagamentos com filtros' })
  @ApiResponse({ status: 200, description: 'Lista de pagamentos', type: [PaymentResponseDto] })
  async getPayments(
    @Query('customerId') customerId?: string,
    @Query('orderId') orderId?: string,
    @Query('webhookId') webhookId?: string,
  ): Promise<PaymentResponseDto[]> {
    if (customerId) {
      return this.paymentService.getPaymentsByCustomerId(customerId);
    }
    if (orderId) {
      return this.paymentService.getPaymentsByOrderId(orderId);
    }
    if (webhookId) {
      const payment = await this.paymentService.getPaymentByWebhookId(webhookId);
      return payment ? [payment] : [];
    }
    return this.paymentService.getAllPayments();
  }
}
