import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { LoggerService } from '../../logging/logger.service';
import { MetricsService } from '../../services/metrics.service';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private static instance: RedisService;
  private client!: Redis;
  private readonly logger = LoggerService.getInstance();
  private readonly subscribers = new Map<string, Set<(message: string) => void>>();
  private readonly namespace: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly metricsService: MetricsService,
    namespace: string = 'onlywave:prod',
  ) {
    this.namespace = namespace;
  }

  public static getInstance(namespace?: string): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService(namespace);
    }
    return RedisService.instance;
  }

  async onModuleInit() {
    try {
      this.client = new Redis({
        host: this.configService.get('redis.host'),
        port: this.configService.get('redis.port'),
        password: this.configService.get('redis.password'),
        db: this.configService.get('redis.db'),
        keyPrefix: this.configService.get('redis.keyPrefix'),
      });

      this.client.on('error', error => {
        this.logger.error('Redis error:', error.stack);
      });

      this.client.on('connect', () => {
        this.logger.log('Redis connected');
      });

      await this.client.ping();
    } catch (error) {
      this.logger.error('Failed to connect to Redis:', error.stack);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }

  private namespaceKey(key: string): string {
    return `${this.namespace}:${key}`;
  }

  async set(key: string, value: string, ttl?: number): Promise<boolean> {
    try {
      const start = process.hrtime();
      const finalTtl = ttl || this.configService.get<number>('redis.ttl') || 3600;
      await this.client.set(key, value);
      await this.client.expire(key, finalTtl);
      const [seconds, nanoseconds] = process.hrtime(start);
      const duration = seconds * 1000 + nanoseconds / 1000000;
      this.metricsService.observeRedisOperationDuration('set', duration);
      return true;
    } catch (error) {
      this.logger.error(
        'Redis set error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      this.metricsService.incrementRedisErrors();
      return false;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      const start = process.hrtime();
      const result = await this.client.get(key);
      const [seconds, nanoseconds] = process.hrtime(start);
      const duration = seconds * 1000 + nanoseconds / 1000000;
      this.metricsService.observeRedisOperationDuration('get', duration);
      return result;
    } catch (error) {
      this.logger.error(
        'Redis get error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      this.metricsService.incrementRedisErrors();
      return null;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      const start = process.hrtime();
      await this.client.del(key);
      const [seconds, nanoseconds] = process.hrtime(start);
      const duration = seconds * 1000 + nanoseconds / 1000000;
      this.metricsService.observeRedisOperationDuration('del', duration);
      return true;
    } catch (error) {
      this.logger.error(
        'Redis del error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      this.metricsService.incrementRedisErrors();
      return false;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const start = process.hrtime();
      const result = await this.client.exists(key);
      const [seconds, nanoseconds] = process.hrtime(start);
      const duration = seconds * 1000 + nanoseconds / 1000000;
      this.metricsService.observeRedisOperationDuration('exists', duration);
      return result === 1;
    } catch (error) {
      this.logger.error(
        'Redis exists error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      this.metricsService.incrementRedisErrors();
      return false;
    }
  }

  async setHash(key: string, field: string, value: string): Promise<void> {
    const startTime = Date.now();
    try {
      const namespacedKey = this.namespaceKey(key);
      await this.client.hset(namespacedKey, field, value);
      const duration = Date.now() - startTime;
      MetricsService.observeRedisOperation('hset', duration);
    } catch (error) {
      MetricsService.incrementRedisErrors('hset');
      this.logger.error('Redis hset error:', error);
      throw error;
    }
  }

  async getHash(key: string, field: string): Promise<string | null> {
    const startTime = Date.now();
    try {
      const namespacedKey = this.namespaceKey(key);
      const value = await this.client.hget(namespacedKey, field);
      const duration = Date.now() - startTime;
      MetricsService.observeRedisOperation('hget', duration);
      return value;
    } catch (error) {
      MetricsService.incrementRedisErrors('hget');
      this.logger.error('Redis hget error:', error);
      throw error;
    }
  }

  async getAllHash(key: string): Promise<Record<string, string>> {
    try {
      const start = process.hrtime();
      const result = await this.client.hgetall(key);
      const [seconds, nanoseconds] = process.hrtime(start);
      const duration = seconds * 1000 + nanoseconds / 1000000;
      this.metricsService.observeRedisOperationDuration('hgetall', duration);
      return result;
    } catch (error) {
      this.logger.error(
        'Redis hgetall error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      this.metricsService.incrementRedisErrors();
      return {};
    }
  }

  async delHashField(key: string, field: string): Promise<void> {
    const startTime = Date.now();
    try {
      const namespacedKey = this.namespaceKey(key);
      await this.client.hdel(namespacedKey, field);
      const duration = Date.now() - startTime;
      MetricsService.observeRedisOperation('hdel', duration);
    } catch (error) {
      MetricsService.incrementRedisErrors('hdel');
      this.logger.error('Redis hdel error:', error);
      throw error;
    }
  }

  async publish(channel: string, message: string): Promise<void> {
    try {
      const namespacedChannel = this.namespaceKey(channel);
      await this.client.publish(namespacedChannel, message);
      MetricsService.incrementPubSubMessages(channel, 'published');
    } catch (error) {
      MetricsService.incrementRedisErrors('publish');
      this.logger.error(
        'Redis publish error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      this.metricsService.incrementRedisErrors();
      throw error;
    }
  }

  async subscribe(channel: string, callback: (message: string) => void): Promise<void> {
    try {
      const namespacedChannel = this.namespaceKey(channel);
      const subscriber = this.client.duplicate();
      await subscriber.subscribe(namespacedChannel);
      subscriber.on('message', (ch, message) => {
        if (ch === namespacedChannel) {
          MetricsService.incrementPubSubMessages(channel, 'received');
          callback(message);
        }
      });
    } catch (error) {
      MetricsService.incrementRedisErrors('subscribe');
      this.logger.error(
        'Redis subscribe error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      this.metricsService.incrementRedisErrors();
      throw error;
    }
  }

  async unsubscribe(channel: string): Promise<void> {
    const startTime = Date.now();
    try {
      const namespacedChannel = this.namespaceKey(channel);
      await this.client.unsubscribe(namespacedChannel);
      const duration = Date.now() - startTime;
      MetricsService.observeRedisOperation('unsubscribe', duration);
    } catch (error) {
      MetricsService.incrementRedisErrors('unsubscribe');
      this.logger.error('Redis unsubscribe error:', error);
      throw error;
    }
  }

  async rpush(key: string, ...values: string[]): Promise<number> {
    const startTime = Date.now();
    try {
      const namespacedKey = this.namespaceKey(key);
      const result = await this.client.rpush(namespacedKey, ...values);
      const duration = Date.now() - startTime;
      MetricsService.observeRedisOperation('rpush', duration);
      MetricsService.incrementListOperations('push');
      return result;
    } catch (error) {
      MetricsService.incrementRedisErrors('rpush');
      this.logger.error('Redis rpush error:', error);
      throw error;
    }
  }

  async lpop(key: string): Promise<string | null> {
    const startTime = Date.now();
    try {
      const namespacedKey = this.namespaceKey(key);
      const value = await this.client.lpop(namespacedKey);
      const duration = Date.now() - startTime;
      MetricsService.observeRedisOperation('lpop', duration);
      MetricsService.incrementListOperations('pop');
      return value;
    } catch (error) {
      MetricsService.incrementRedisErrors('lpop');
      this.logger.error('Redis lpop error:', error);
      throw error;
    }
  }

  async llen(key: string): Promise<number> {
    const startTime = Date.now();
    try {
      const namespacedKey = this.namespaceKey(key);
      const length = await this.client.llen(namespacedKey);
      const duration = Date.now() - startTime;
      MetricsService.observeRedisOperation('llen', duration);
      MetricsService.incrementListOperations('length');
      return length;
    } catch (error) {
      MetricsService.incrementRedisErrors('llen');
      this.logger.error('Redis llen error:', error);
      throw error;
    }
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    const startTime = Date.now();
    try {
      const namespacedKey = this.namespaceKey(key);
      const values = await this.client.lrange(namespacedKey, start, stop);
      const duration = Date.now() - startTime;
      MetricsService.observeRedisOperation('lrange', duration);
      MetricsService.incrementListOperations('range');
      return values;
    } catch (error) {
      MetricsService.incrementRedisErrors('lrange');
      this.logger.error('Redis lrange error:', error);
      throw error;
    }
  }

  async mget(keys: string[]): Promise<(string | null)[]> {
    try {
      const start = process.hrtime();
      const result = await this.client.mget(keys);
      const [seconds, nanoseconds] = process.hrtime(start);
      const duration = seconds * 1000 + nanoseconds / 1000000;
      this.metricsService.observeRedisOperationDuration('mget', duration);
      return result;
    } catch (error) {
      this.logger.error(
        'Redis mget error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      this.metricsService.incrementRedisErrors();
      return keys.map(() => null);
    }
  }

  async mset(keyValuePairs: [string, string][]): Promise<boolean> {
    try {
      const start = process.hrtime();
      await this.client.mset(keyValuePairs);
      const [seconds, nanoseconds] = process.hrtime(start);
      const duration = seconds * 1000 + nanoseconds / 1000000;
      this.metricsService.observeRedisOperationDuration('mset', duration);
      return true;
    } catch (error) {
      this.logger.error(
        'Redis mset error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      this.metricsService.incrementRedisErrors();
      return false;
    }
  }

  async executePipeline(commands: string[][]): Promise<any[]> {
    try {
      const pipeline = this.client.pipeline();
      commands.forEach(command => {
        pipeline[command[0]](...command.slice(1));
      });
      const result = await pipeline.exec();
      const [seconds, nanoseconds] = process.hrtime();
      const duration = seconds * 1000 + nanoseconds / 1000000;
      this.metricsService.observeRedisOperationDuration('pipeline', duration);
      return result?.map(([err, reply]) => (err ? null : reply)) || [];
    } catch (error) {
      this.logger.error(
        'Redis pipeline error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      this.metricsService.incrementRedisErrors();
      return commands.map(() => null);
    }
  }

  getClient(): Redis {
    return this.client;
  }
}
