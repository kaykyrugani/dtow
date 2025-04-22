import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { MetricsService } from '../../services/metrics.service';
import { LoggingService } from '../../services/LoggingService';
import Redis from 'ioredis';

jest.mock('ioredis');
jest.mock('../../services/metrics.service');
jest.mock('../../services/LoggingService');

// Definir interface para o mock do MetricsService
interface MockMetricsService {
  incrementRedisErrors: jest.Mock;
  incrementRedisConnections: jest.Mock;
  observeRedisOperationDuration: jest.Mock;
}

describe('RedisService Resilience', () => {
  let service: RedisService;
  let mockRedisClient: jest.Mocked<Redis>;
  let mockMetricsService: MockMetricsService;
  let mockConfigService: jest.Mocked<ConfigService>;
  let mockLoggingService: jest.Mocked<LoggingService>;

  beforeAll(async () => {
    mockRedisClient = new Redis() as jest.Mocked<Redis>;
    mockMetricsService = {
      incrementRedisErrors: jest.fn(),
      incrementRedisConnections: jest.fn(),
      observeRedisOperationDuration: jest.fn(),
    };

    mockConfigService = {
      get: jest.fn((key: string) => {
        const config: Record<string, any> = {
          'redis.host': 'localhost',
          'redis.port': 6379,
          'redis.password': 'password',
          'redis.db': 0,
          'redis.keyPrefix': 'test:',
          'redis.maxRetries': 3,
          'redis.retryDelay': 1000,
          'redis.ttl': 3600,
        };
        return config[key];
      }),
    } as any;

    mockLoggingService = {
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: MetricsService,
          useValue: mockMetricsService,
        },
        {
          provide: LoggingService,
          useValue: mockLoggingService,
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  describe('Connection Resilience', () => {
    it('should retry connection on failure', async () => {
      const connectMock = jest
        .fn()
        .mockRejectedValueOnce(new Error('Connection failed'))
        .mockRejectedValueOnce(new Error('Connection failed'))
        .mockResolvedValueOnce(undefined);

      (Redis as unknown as jest.Mock).mockImplementation(() => ({
        connect: connectMock,
        on: jest.fn(),
      }));

      await service.initialize();

      expect(connectMock).toHaveBeenCalledTimes(3);
      expect(mockLoggingService.error).toHaveBeenCalledTimes(2);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalledTimes(2);
    });

    it('should throw error after max retries', async () => {
      const connectMock = jest.fn().mockRejectedValue(new Error('Connection failed'));

      (Redis as unknown as jest.Mock).mockImplementation(() => ({
        connect: connectMock,
        on: jest.fn(),
      }));

      await expect(service.initialize()).rejects.toThrow('Connection failed');
      expect(connectMock).toHaveBeenCalledTimes(3);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalledTimes(3);
    });

    it('should handle connection timeout', async () => {
      const connectMock = jest.fn().mockRejectedValue(new Error('Connection timeout'));

      (Redis as unknown as jest.Mock).mockImplementation(() => ({
        connect: connectMock,
        on: jest.fn(),
      }));

      await expect(service.initialize()).rejects.toThrow('Connection timeout');
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
    });
  });

  describe('Operation Resilience', () => {
    beforeEach(() => {
      mockRedisClient.get.mockReset();
      mockRedisClient.set.mockReset();
      mockRedisClient.del.mockReset();
      mockRedisClient.exists.mockReset();
      mockRedisClient.hgetall.mockReset();
    });

    it('should handle get operation failure', async () => {
      mockRedisClient.get.mockRejectedValue(new Error('Get failed'));

      const result = await service.get('test-key');

      expect(result).toBeNull();
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });

    it('should handle set operation failure', async () => {
      mockRedisClient.set.mockRejectedValue(new Error('Set failed'));

      const result = await service.set('test-key', 'test-value');

      expect(result).toBe(false);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });

    it('should handle del operation failure', async () => {
      mockRedisClient.del.mockRejectedValue(new Error('Del failed'));

      const result = await service.del('test-key');

      expect(result).toBe(false);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });

    it('should handle exists operation failure', async () => {
      mockRedisClient.exists.mockRejectedValue(new Error('Exists failed'));

      const result = await service.exists('test-key');

      expect(result).toBe(false);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });

    it('should handle hgetall operation failure', async () => {
      mockRedisClient.hgetall.mockRejectedValue(new Error('Hgetall failed'));

      const result = await service.getAllHash('test-key');

      expect(result).toEqual({});
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });

    it('should handle operation timeout', async () => {
      mockRedisClient.get.mockRejectedValue(new Error('Operation timeout'));

      const result = await service.get('test-key');

      expect(result).toBeNull();
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });
  });

  describe('Pub/Sub Resilience', () => {
    it('should handle publish failure', async () => {
      mockRedisClient.publish.mockRejectedValue(new Error('Publish failed'));

      await expect(service.publish('test-channel', 'test-message')).rejects.toThrow(
        'Publish failed',
      );
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });

    it('should handle subscribe failure', async () => {
      mockRedisClient.subscribe.mockRejectedValue(new Error('Subscribe failed'));

      await expect(service.subscribe('test-channel', jest.fn())).rejects.toThrow(
        'Subscribe failed',
      );
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });

    it('should handle unsubscribe failure', async () => {
      mockRedisClient.unsubscribe.mockRejectedValue(new Error('Unsubscribe failed'));

      await expect(service.unsubscribe('test-channel')).rejects.toThrow('Unsubscribe failed');
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });
  });

  describe('Batch Operation Resilience', () => {
    it('should handle mget failure', async () => {
      mockRedisClient.mget.mockRejectedValue(new Error('Mget failed'));

      const result = await service.mget(['key1', 'key2']);

      expect(result).toEqual([null, null]);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });

    it('should handle mset failure', async () => {
      mockRedisClient.mset.mockRejectedValue(new Error('Mset failed'));

      const result = await service.mset([
        ['key1', 'value1'],
        ['key2', 'value2'],
      ]);

      expect(result).toBe(false);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });

    it('should handle partial batch operation failure', async () => {
      mockRedisClient.mget.mockResolvedValueOnce(['value1', null]);

      const result = await service.mget(['key1', 'key2']);

      expect(result).toEqual(['value1', null]);
      expect(mockLoggingService.warn).toHaveBeenCalled();
    });
  });

  describe('Pipeline Operation Resilience', () => {
    it('should handle pipeline execution failure', async () => {
      mockRedisClient.pipeline.mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('Pipeline failed')),
      } as any);

      const result = await service.executePipeline([
        ['set', 'key1', 'value1'],
        ['get', 'key1'],
      ]);

      expect(result).toEqual([null, null]);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });

    it('should handle partial pipeline execution failure', async () => {
      mockRedisClient.pipeline.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([null, new Error('Pipeline failed')]),
      } as any);

      const result = await service.executePipeline([
        ['set', 'key1', 'value1'],
        ['get', 'key1'],
      ]);

      expect(result).toEqual([null, null]);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });
  });

  describe('TTL Operation Resilience', () => {
    it('should use default TTL when expire fails', async () => {
      mockRedisClient.set.mockResolvedValue('OK');
      mockRedisClient.expire.mockRejectedValue(new Error('Expire failed'));

      const result = await service.set('test-key', 'test-value');

      expect(result).toBe(true);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });

    it('should handle TTL operation timeout', async () => {
      mockRedisClient.set.mockResolvedValue('OK');
      mockRedisClient.expire.mockRejectedValue(new Error('TTL operation timeout'));

      const result = await service.set('test-key', 'test-value');

      expect(result).toBe(true);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalled();
    });
  });

  // Novos testes de resiliência avançados
  describe('Recovery After Failure', () => {
    it('should recover after connection failure', async () => {
      // Simular falha de conexão
      const connectMock = jest
        .fn()
        .mockRejectedValueOnce(new Error('Connection failed'))
        .mockResolvedValueOnce(undefined);

      (Redis as unknown as jest.Mock).mockImplementation(() => ({
        connect: connectMock,
        on: jest.fn(),
      }));

      await service.initialize();
      expect(connectMock).toHaveBeenCalledTimes(2);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalledTimes(1);

      // Simular operação bem-sucedida após recuperação
      mockRedisClient.get.mockResolvedValueOnce('value');
      const result = await service.get('test-key');
      expect(result).toBe('value');
      expect(mockMetricsService.observeRedisOperationDuration).toHaveBeenCalled();
    });

    it('should recover after operation failure', async () => {
      // Simular falha na operação
      mockRedisClient.set.mockRejectedValueOnce(new Error('Set failed'));
      const result1 = await service.set('test-key', 'test-value');
      expect(result1).toBe(false);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();

      // Simular operação bem-sucedida após falha
      mockRedisClient.set.mockResolvedValueOnce('OK');
      const result2 = await service.set('test-key', 'test-value');
      expect(result2).toBe(true);
      expect(mockMetricsService.observeRedisOperationDuration).toHaveBeenCalled();
    });
  });

  describe('Intermittent Error Rate', () => {
    it('should handle 5% error rate in operations', async () => {
      // Simular 5% de falhas (1 em 20)
      let callCount = 0;
      mockRedisClient.get.mockImplementation(() => {
        callCount++;
        if (callCount % 20 === 0) {
          return Promise.reject(new Error('Intermittent error'));
        }
        return Promise.resolve('value');
      });

      // Executar 100 operações
      const results = await Promise.all(
        Array(100)
          .fill(0)
          .map(() => service.get('test-key')),
      );

      // Verificar que aproximadamente 5% falharam
      const failures = results.filter(r => r === null).length;
      expect(failures).toBeGreaterThanOrEqual(4);
      expect(failures).toBeLessThanOrEqual(6);
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalledTimes(failures);
    });
  });

  describe('Observability Compliance', () => {
    it('should log errors with traceId', async () => {
      // Simular erro com traceId
      const traceId = 'trace-123';
      const error = new Error('Test error');
      (error as any).traceId = traceId;

      mockRedisClient.get.mockRejectedValue(error);

      await service.get('test-key');

      expect(mockLoggingService.error).toHaveBeenCalledWith(
        expect.stringContaining('Test error'),
        expect.objectContaining({ traceId }),
      );
    });

    it('should emit metrics for all operations', async () => {
      // Simular operação bem-sucedida
      mockRedisClient.get.mockResolvedValueOnce('value');
      await service.get('test-key');

      expect(mockMetricsService.observeRedisOperationDuration).toHaveBeenCalledWith(
        'get',
        expect.any(Number),
      );

      // Simular operação com falha
      mockRedisClient.set.mockRejectedValueOnce(new Error('Set failed'));
      await service.set('test-key', 'test-value');

      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
    });
  });

  describe('Operation Cancellation and Timeout', () => {
    it('should handle operation cancellation', async () => {
      // Simular operação que pode ser cancelada
      const abortController = new AbortController();
      const timeout = setTimeout(() => abortController.abort(), 100);

      mockRedisClient.get.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (abortController.signal.aborted) {
              reject(new Error('Operation cancelled'));
            } else {
              resolve('value');
            }
          }, 200);
        });
      });

      const result = await service.get('test-key');
      clearTimeout(timeout);

      expect(result).toBeNull();
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalledWith(
        expect.stringContaining('Operation cancelled'),
      );
    });

    it('should handle custom timeout', async () => {
      // Simular operação lenta
      mockRedisClient.get.mockImplementation(() => {
        return new Promise(resolve => setTimeout(() => resolve('value'), 200));
      });

      // Definir timeout curto
      const result = await service.get('test-key');

      expect(result).toBeNull();
      expect(mockMetricsService.incrementRedisErrors).toHaveBeenCalled();
      expect(mockLoggingService.error).toHaveBeenCalledWith(expect.stringContaining('timeout'));
    });
  });

  describe('Asynchronous Behavior', () => {
    it('should handle multiple subscribers', async () => {
      const channel = 'test-channel';
      const message = 'test-message';
      const subscribers = [jest.fn(), jest.fn(), jest.fn()];

      // Simular múltiplos subscribers
      mockRedisClient.subscribe.mockResolvedValueOnce(undefined);
      mockRedisClient.on = jest.fn().mockImplementation((event, callback) => {
        if (event === 'message') {
          callback(channel, message);
        }
        return mockRedisClient;
      });

      // Registrar múltiplos subscribers
      await Promise.all(subscribers.map(sub => service.subscribe(channel, sub)));

      // Publicar mensagem
      await service.publish(channel, message);

      // Verificar que todos os subscribers receberam a mensagem
      subscribers.forEach(sub => {
        expect(sub).toHaveBeenCalledWith(message);
      });
    });

    it('should handle real-time pub/sub', async () => {
      const channel = 'test-channel';
      const messages = ['msg1', 'msg2', 'msg3'];
      const receivedMessages: string[] = [];

      // Simular subscriber
      mockRedisClient.subscribe.mockResolvedValueOnce(undefined);
      mockRedisClient.on = jest.fn().mockImplementation((event, callback) => {
        if (event === 'message') {
          messages.forEach(msg => {
            setTimeout(() => callback(channel, msg), 10);
          });
        }
        return mockRedisClient;
      });

      // Registrar subscriber
      await service.subscribe(channel, msg => {
        receivedMessages.push(msg);
      });

      // Publicar mensagens
      await Promise.all(messages.map(msg => service.publish(channel, msg)));

      // Verificar que todas as mensagens foram recebidas na ordem correta
      expect(receivedMessages).toEqual(messages);
    });
  });

  describe('Edge Cases and Limits', () => {
    it('should handle very long keys', async () => {
      const longKey = 'a'.repeat(10000);
      mockRedisClient.get.mockResolvedValueOnce('value');

      const result = await service.get(longKey);

      expect(result).toBe('value');
      expect(mockLoggingService.warn).toHaveBeenCalledWith(expect.stringContaining('long key'));
    });

    it('should handle large lists', async () => {
      const largeList = Array(10000).fill('item');
      mockRedisClient.rpush.mockResolvedValueOnce(largeList.length);

      await service.rpush('test-list', ...largeList);

      expect(mockLoggingService.warn).toHaveBeenCalledWith(expect.stringContaining('large list'));
    });

    it('should handle specific Redis errors', async () => {
      // ECONNREFUSED
      mockRedisClient.get.mockRejectedValueOnce(new Error('ECONNREFUSED'));
      await service.get('test-key');
      expect(mockLoggingService.error).toHaveBeenCalledWith(
        expect.stringContaining('ECONNREFUSED'),
      );

      // ETIMEOUT
      mockRedisClient.get.mockRejectedValueOnce(new Error('ETIMEOUT'));
      await service.get('test-key');
      expect(mockLoggingService.error).toHaveBeenCalledWith(expect.stringContaining('ETIMEOUT'));

      // NR_CLOSED
      mockRedisClient.get.mockRejectedValueOnce(new Error('NR_CLOSED'));
      await service.get('test-key');
      expect(mockLoggingService.error).toHaveBeenCalledWith(expect.stringContaining('NR_CLOSED'));
    });
  });
});
