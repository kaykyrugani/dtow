import { MetricsService } from '../metrics.service';
import { register } from 'prom-client';

jest.mock('prom-client');

describe('MetricsService', () => {
  let metricsService: MetricsService;

  beforeEach(() => {
    metricsService = MetricsService.getInstance();
    (register.metrics as jest.Mock).mockClear();
  });

  describe('incrementPaymentPreferencesCreated', () => {
    it('deve incrementar contador de preferências criadas', () => {
      const paymentType = 'credit_card';
      metricsService.incrementPaymentPreferencesCreated(paymentType);
      expect(register.metrics).toHaveBeenCalled();
    });
  });

  describe('incrementPaymentRefunded', () => {
    it('deve incrementar contador de reembolsos', () => {
      const paymentType = 'credit_card';
      const amount = '100';
      metricsService.incrementPaymentRefunded(paymentType, amount);
      expect(register.metrics).toHaveBeenCalled();
    });
  });

  describe('incrementWebhookIdempotencyIgnored', () => {
    it('deve incrementar contador de webhooks ignorados por idempotência', () => {
      const paymentType = 'credit_card';
      metricsService.incrementWebhookIdempotencyIgnored(paymentType);
      expect(register.metrics).toHaveBeenCalled();
    });
  });

  describe('incrementWebhookOutOfOrder', () => {
    it('deve incrementar contador de webhooks fora de ordem', () => {
      const paymentType = 'credit_card';
      metricsService.incrementWebhookOutOfOrder(paymentType);
      expect(register.metrics).toHaveBeenCalled();
    });
  });

  describe('incrementWebhookFailures', () => {
    it('deve incrementar contador de falhas em webhooks', () => {
      const paymentType = 'credit_card';
      const reason = 'process_webhook_failed';
      metricsService.incrementWebhookFailures(paymentType, reason);
      expect(register.metrics).toHaveBeenCalled();
    });
  });

  describe('observeCacheOperation', () => {
    it('deve registrar duração de operação de cache', () => {
      const service = 'payment';
      const operation = 'get_payment';
      const duration = 100;
      metricsService.observeCacheOperation(service, operation, duration);
      expect(register.metrics).toHaveBeenCalled();
    });
  });

  describe('observePaymentProcessingDuration', () => {
    it('deve registrar duração de processamento de pagamento', () => {
      const paymentType = 'credit_card';
      const operation = 'process_payment';
      const duration = 100;
      metricsService.observePaymentProcessingDuration(paymentType, operation, duration);
      expect(register.metrics).toHaveBeenCalled();
    });
  });

  describe('incrementCacheMiss', () => {
    it('deve incrementar contador de cache miss', () => {
      const service = 'payment';
      const operation = 'get_payment';
      metricsService.incrementCacheMiss(service, operation);
      expect(register.metrics).toHaveBeenCalled();
    });
  });
});
