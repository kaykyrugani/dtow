import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { Refund } from '../entities/refund.entity';
import { Webhook } from '../entities/webhook.entity';
import { WebhookDto } from '../dto/webhook.dto';
import { RefundDto } from '../dto/refund.dto';
import { PaymentResponseDto } from '../dto/payment-response.dto';
import { RefundResponseDto } from '../dto/refund-response.dto';
import { WebhookResponseDto } from '../dto/webhook-response.dto';
import { PaymentStatus } from '../interfaces/payment-status.interface';
import { RefundStatus } from '../interfaces/refund-status.interface';
import { WebhookStatus } from '../interfaces/webhook-status.interface';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Refund)
    private readonly refundRepository: Repository<Refund>,
    @InjectRepository(Webhook)
    private readonly webhookRepository: Repository<Webhook>,
  ) {}

  async processWebhook(webhookDto: WebhookDto): Promise<WebhookResponseDto> {
    const webhook = this.webhookRepository.create({
      ...webhookDto,
      status: WebhookStatus.PENDING,
      attempts: 0,
    });

    await this.webhookRepository.save(webhook);
    return webhook;
  }

  async refundPayment(id: string, refundDto: RefundDto): Promise<RefundResponseDto> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }

    const refund = this.refundRepository.create({
      paymentId: payment.id,
      amount: refundDto.amount,
      status: RefundStatus.PENDING,
    });

    await this.refundRepository.save(refund);
    return refund;
  }

  async getPaymentById(id: string): Promise<PaymentResponseDto> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }
    return payment;
  }

  async getPaymentsByCustomerId(customerId: string): Promise<PaymentResponseDto[]> {
    return this.paymentRepository.find({ where: { customerId } });
  }

  async getPaymentsByOrderId(orderId: string): Promise<PaymentResponseDto[]> {
    return this.paymentRepository.find({ where: { orderId } });
  }

  async getPaymentByWebhookId(webhookId: string): Promise<PaymentResponseDto | null> {
    return this.paymentRepository.findOne({ where: { webhookId } });
  }

  async getAllPayments(): Promise<PaymentResponseDto[]> {
    return this.paymentRepository.find();
  }
}
