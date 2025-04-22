import { Test, TestingModule } from '@nestjs/testing';
import { MetricsMiddleware } from './metrics.middleware';
import { MetricsService } from './metrics.service';

describe('MetricsMiddleware', () => {
  let middleware: MetricsMiddleware;
  let metricsService: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsMiddleware,
        {
          provide: MetricsService,
          useValue: {
            recordHttpMetric: jest.fn(),
          },
        },
      ],
    }).compile();

    middleware = module.get<MetricsMiddleware>(MetricsMiddleware);
    metricsService = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('use', () => {
    it('should record metrics on response finish', () => {
      const req = {
        method: 'GET',
        path: '/test',
      };
      const res = {
        statusCode: 200,
        on: jest.fn().mockImplementation((event, callback) => {
          if (event === 'finish') {
            callback();
          }
        }),
      };
      const next = jest.fn();

      middleware.use(req as any, res as any, next);

      expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
      expect(next).toHaveBeenCalled();
      expect(metricsService.recordHttpMetric).toHaveBeenCalledWith(
        'GET',
        '/test',
        200,
        expect.any(Number),
      );
    });
  });
});
