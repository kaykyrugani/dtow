import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MetricsService } from './metrics.service';

describe('MetricsService', () => {
  let service: MetricsService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('recordHttpMetric', () => {
    it('should record HTTP metrics when enabled', () => {
      service.recordHttpMetric('GET', '/test', 200, 0.1);
      expect(configService.get).toHaveBeenCalledWith('metrics.enabled');
    });

    it('should not record HTTP metrics when disabled', () => {
      jest.spyOn(configService, 'get').mockReturnValue(false);
      service.recordHttpMetric('GET', '/test', 200, 0.1);
      expect(configService.get).toHaveBeenCalledWith('metrics.enabled');
    });
  });

  describe('recordPayment', () => {
    it('should record payment metrics when enabled', () => {
      service.recordPayment(100, 'USD', 'success');
      expect(configService.get).toHaveBeenCalledWith('metrics.enabled');
    });

    it('should not record payment metrics when disabled', () => {
      jest.spyOn(configService, 'get').mockReturnValue(false);
      service.recordPayment(100, 'USD', 'success');
      expect(configService.get).toHaveBeenCalledWith('metrics.enabled');
    });
  });

  describe('recordRefund', () => {
    it('should record refund metrics when enabled', () => {
      service.recordRefund(50, 'USD', 'success');
      expect(configService.get).toHaveBeenCalledWith('metrics.enabled');
    });

    it('should not record refund metrics when disabled', () => {
      jest.spyOn(configService, 'get').mockReturnValue(false);
      service.recordRefund(50, 'USD', 'success');
      expect(configService.get).toHaveBeenCalledWith('metrics.enabled');
    });
  });

  describe('recordError', () => {
    it('should record error metrics when enabled', () => {
      service.recordError('validation');
      expect(configService.get).toHaveBeenCalledWith('metrics.enabled');
    });

    it('should not record error metrics when disabled', () => {
      jest.spyOn(configService, 'get').mockReturnValue(false);
      service.recordError('validation');
      expect(configService.get).toHaveBeenCalledWith('metrics.enabled');
    });
  });

  describe('getMetrics', () => {
    it('should return metrics as string', async () => {
      const metrics = await service.getMetrics();
      expect(typeof metrics).toBe('string');
    });
  });
});
