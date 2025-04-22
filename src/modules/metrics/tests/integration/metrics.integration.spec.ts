import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from '../../services/metrics.service';
import { MetricsController } from '../metrics.controller';
import { ConfigService } from '@nestjs/config';

describe('MetricsService Integration Tests', () => {
  let service: MetricsService;
  let controller: MetricsController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        MetricsController,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'METRICS_ENABLED':
                  return true;
                case 'METRICS_PORT':
                  return 9090;
                default:
                  return undefined;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
    controller = module.get<MetricsController>(MetricsController);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('observeHttpDuration', () => {
    it('deve registrar a duração de uma requisição HTTP', () => {
      const metrics = {
        method: 'GET',
        path: '/api/payments',
        status: 200,
        duration: 100,
      };

      service.observeHttpDuration(metrics);
      const result = service.getMetrics();

      expect(result).toContain('http_request_duration_seconds');
      expect(result).toContain('method="GET"');
      expect(result).toContain('path="/api/payments"');
      expect(result).toContain('status="200"');
    });
  });

  describe('incrementHttpRequests', () => {
    it('deve incrementar o contador de requisições HTTP', () => {
      const metrics = {
        method: 'POST',
        path: '/api/payments',
        status: 201,
      };

      service.incrementHttpRequests(metrics);
      const result = service.getMetrics();

      expect(result).toContain('http_requests_total');
      expect(result).toContain('method="POST"');
      expect(result).toContain('path="/api/payments"');
      expect(result).toContain('status="201"');
    });
  });

  describe('observeRedisOperationDuration', () => {
    it('deve registrar a duração de uma operação Redis', () => {
      const operation = 'get';
      const duration = 50;

      service.observeRedisOperationDuration(operation, duration);
      const result = service.getMetrics();

      expect(result).toContain('redis_operation_duration_seconds');
      expect(result).toContain('operation="get"');
    });
  });

  describe('incrementRedisErrors', () => {
    it('deve incrementar o contador de erros Redis', () => {
      service.incrementRedisErrors();
      const result = service.getMetrics();

      expect(result).toContain('redis_errors_total');
    });
  });

  describe('getMetrics', () => {
    it('deve retornar todas as métricas em formato Prometheus', () => {
      const result = service.getMetrics();

      expect(result).toContain('# HELP');
      expect(result).toContain('# TYPE');
      expect(result).toContain('http_request_duration_seconds');
      expect(result).toContain('http_requests_total');
      expect(result).toContain('redis_operation_duration_seconds');
      expect(result).toContain('redis_errors_total');
    });
  });
});
