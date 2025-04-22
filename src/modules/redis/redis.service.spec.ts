import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { MetricsService } from '../../services/metrics.service';
import { LoggingService } from '../../services/LoggingService';
import Redis from 'ioredis';

jest.mock('ioredis');
jest.mock('../../services/metrics.service');
jest.mock('../../services/LoggingService');

describe('RedisService', () => {
  let service: RedisService;
  let mockRedisClient: jest.Mocked<Redis>;
  let mockConfigService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    mockRedisClient = {
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
      exists: jest.fn(),
      hset: jest.fn(),
      hget: jest.fn(),
      hgetall: jest.fn(),
      hdel: jest.fn(),
      publish: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      rpush: jest.fn(),
      lpop: jest.fn(),
      llen: jest.fn(),
      lrange: jest.fn(),
      on: jest.fn(),
      quit: jest.fn(),
    } as any;

    mockConfigService = {
      get: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
    (Redis as jest.Mock).mockImplementation(() => mockRedisClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Operações Básicas', () => {
    it('deve setar e recuperar um valor', async () => {
      const key = 'test:key';
      const value = 'test-value';
      const ttl = 3600;

      mockRedisClient.set.mockResolvedValue('OK');
      mockRedisClient.get.mockResolvedValue(value);

      await service.set(key, value, ttl);
      const result = await service.get(key);

      expect(mockRedisClient.set).toHaveBeenCalledWith(key, value, 'EX', ttl);
      expect(mockRedisClient.get).toHaveBeenCalledWith(key);
      expect(result).toBe(value);
    });

    it('deve deletar uma chave e verificar sua ausência', async () => {
      const key = 'test:key';

      mockRedisClient.del.mockResolvedValue(1);
      mockRedisClient.exists.mockResolvedValue(0);

      await service.del(key);
      const exists = await service.exists(key);

      expect(mockRedisClient.del).toHaveBeenCalledWith(key);
      expect(mockRedisClient.exists).toHaveBeenCalledWith(key);
      expect(exists).toBe(false);
    });

    it('deve usar o TTL padrão quando não especificado', async () => {
      const key = 'test:key';
      const value = 'test-value';
      const defaultTtl = 3600;

      mockConfigService.get.mockReturnValue(defaultTtl);
      mockRedisClient.set.mockResolvedValue('OK');

      await service.set(key, value);

      expect(mockRedisClient.set).toHaveBeenCalledWith(key, value, 'EX', defaultTtl);
    });
  });

  describe('Operações com Hashes', () => {
    it('deve setar e recuperar um campo de hash', async () => {
      const key = 'test:hash';
      const field = 'field1';
      const value = 'value1';

      mockRedisClient.hset.mockResolvedValue(1);
      mockRedisClient.hget.mockResolvedValue(value);

      await service.setHash(key, field, value);
      const result = await service.getHash(key, field);

      expect(mockRedisClient.hset).toHaveBeenCalledWith(key, field, value);
      expect(mockRedisClient.hget).toHaveBeenCalledWith(key, field);
      expect(result).toBe(value);
    });

    it('deve recuperar todos os campos de um hash', async () => {
      const key = 'test:hash';
      const hashData = { field1: 'value1', field2: 'value2' };

      mockRedisClient.hgetall.mockResolvedValue(hashData);

      const result = await service.getAllHash(key);

      expect(mockRedisClient.hgetall).toHaveBeenCalledWith(key);
      expect(result).toEqual(hashData);
    });
  });

  describe('Operações com Listas', () => {
    it('deve adicionar e remover elementos da lista', async () => {
      const key = 'test:list';
      const value = 'value1';

      mockRedisClient.rpush.mockResolvedValue(1);
      mockRedisClient.lpop.mockResolvedValue(value);
      mockRedisClient.llen.mockResolvedValue(1);

      await service.rpush(key, value);
      const length = await service.llen(key);
      const result = await service.lpop(key);

      expect(mockRedisClient.rpush).toHaveBeenCalledWith(key, value);
      expect(mockRedisClient.llen).toHaveBeenCalledWith(key);
      expect(mockRedisClient.lpop).toHaveBeenCalledWith(key);
      expect(length).toBe(1);
      expect(result).toBe(value);
    });

    it('deve recuperar um intervalo de elementos da lista', async () => {
      const key = 'test:list';
      const values = ['value1', 'value2', 'value3'];

      mockRedisClient.lrange.mockResolvedValue(values);

      const result = await service.lrange(key, 0, -1);

      expect(mockRedisClient.lrange).toHaveBeenCalledWith(key, 0, -1);
      expect(result).toEqual(values);
    });
  });

  describe('Pub/Sub', () => {
    it('deve publicar e receber mensagens', async () => {
      const channel = 'test:channel';
      const message = 'test-message';
      const callback = jest.fn();

      mockRedisClient.publish.mockResolvedValue(1);
      mockRedisClient.subscribe.mockResolvedValue(undefined);

      await service.publish(channel, message);
      await service.subscribe(channel, callback);

      expect(mockRedisClient.publish).toHaveBeenCalledWith(channel, message);
      expect(mockRedisClient.subscribe).toHaveBeenCalledWith(channel);
    });

    it('deve cancelar inscrição de um canal', async () => {
      const channel = 'test:channel';

      mockRedisClient.unsubscribe.mockResolvedValue(undefined);

      await service.unsubscribe(channel);

      expect(mockRedisClient.unsubscribe).toHaveBeenCalledWith(channel);
    });
  });

  describe('Tratamento de Erros', () => {
    it('deve lidar com erros de conexão', async () => {
      const error = new Error('Connection failed');
      mockRedisClient.set.mockRejectedValue(error);

      await expect(service.set('test:key', 'value')).rejects.toThrow('Connection failed');
      expect(MetricsService.incrementRedisErrors).toHaveBeenCalledWith('set');
    });

    it('deve lidar com timeouts', async () => {
      const error = new Error('Operation timed out');
      mockRedisClient.get.mockRejectedValue(error);

      await expect(service.get('test:key')).rejects.toThrow('Operation timed out');
      expect(MetricsService.incrementRedisErrors).toHaveBeenCalledWith('get');
    });
  });
});
