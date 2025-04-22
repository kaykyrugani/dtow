import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

describe('MetricsController', () => {
  let controller: MetricsController;
  let metricsService: MetricsService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricsController],
      providers: [
        {
          provide: MetricsService,
          useValue: {
            getMetrics: jest.fn().mockResolvedValue('test metrics'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<MetricsController>(MetricsController);
    metricsService = module.get<MetricsService>(MetricsService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMetrics', () => {
    it('should return metrics when enabled', async () => {
      const result = await controller.getMetrics();
      expect(result).toBe('test metrics');
      expect(metricsService.getMetrics).toHaveBeenCalled();
      expect(configService.get).toHaveBeenCalledWith('metrics.enabled');
    });

    it('should return disabled message when metrics are disabled', async () => {
      jest.spyOn(configService, 'get').mockReturnValue(false);
      const result = await controller.getMetrics();
      expect(result).toBe('# Metrics are disabled');
      expect(metricsService.getMetrics).not.toHaveBeenCalled();
      expect(configService.get).toHaveBeenCalledWith('metrics.enabled');
    });
  });
});
