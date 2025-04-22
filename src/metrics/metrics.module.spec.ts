import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MetricsModule } from './metrics.module';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { MetricsMiddleware } from './metrics.middleware';

describe('MetricsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [MetricsModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide MetricsService', () => {
    const service = module.get<MetricsService>(MetricsService);
    expect(service).toBeDefined();
  });

  it('should provide MetricsController', () => {
    const controller = module.get<MetricsController>(MetricsController);
    expect(controller).toBeDefined();
  });

  it('should provide MetricsMiddleware', () => {
    const middleware = module.get<MetricsMiddleware>(MetricsMiddleware);
    expect(middleware).toBeDefined();
  });
});
