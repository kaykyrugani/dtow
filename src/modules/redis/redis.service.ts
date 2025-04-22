import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { LoggerService } from '../../logging/logger.service';
import { MetricsService } from '../../metrics/metrics.service';

@Injectable()
export class RedisService {
  private client: Redis;
  private logger: LoggerService;

  constructor(
    private readonly configService: ConfigService,
    private readonly metricsService: MetricsService,
  ) {
    this.logger = new LoggerService();
    this.initialize();
  }

  private initialize(): void {
    const host = this.configService.get<string>('REDIS_HOST');
    const port = this.configService.get<number>('REDIS_PORT');
    const password = this.configService.get<string>('REDIS_PASSWORD');
    const db = this.configService.get<number>('REDIS_DB');

    this.client = new Redis({
      host,
      port,
      password,
      db,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.client.on('error', (error) => {
      this.logger.error('Redis connection error', error.message);
      this.metricsService.recordError('redis_connection');
    });

    this.client.on('connect', () => {
      this.logger.log('Redis connected successfully');
    });
  }

  async get(key: string): Promise<string | null> {
    const start = Date.now();
    try {
      const value = await this.client.get(key);
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('GET', '/redis/get', 200, duration);
      return value;
    } catch (error) {
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('GET', '/redis/get', 500, duration);
      this.logger.error('Redis get error', error.message);
      this.metricsService.recordError('redis_get');
      throw error;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    const start = Date.now();
    try {
      if (ttl) {
        await this.client.setex(key, ttl, value);
      } else {
        await this.client.set(key, value);
      }
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('SET', '/redis/set', 200, duration);
    } catch (error) {
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('SET', '/redis/set', 500, duration);
      this.logger.error('Redis set error', error.message);
      this.metricsService.recordError('redis_set');
      throw error;
    }
  }

  async del(key: string): Promise<void> {
    const start = Date.now();
    try {
      await this.client.del(key);
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('DEL', '/redis/del', 200, duration);
    } catch (error) {
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('DEL', '/redis/del', 500, duration);
      this.logger.error('Redis del error', error.message);
      this.metricsService.recordError('redis_del');
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    const start = Date.now();
    try {
      const result = await this.client.exists(key);
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('EXISTS', '/redis/exists', 200, duration);
      return result === 1;
    } catch (error) {
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('EXISTS', '/redis/exists', 500, duration);
      this.logger.error('Redis exists error', error.message);
      this.metricsService.recordError('redis_exists');
      throw error;
    }
  }

  async getAllHash(key: string): Promise<Record<string, string>> {
    const start = Date.now();
    try {
      const result = await this.client.hgetall(key);
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('HGETALL', '/redis/hgetall', 200, duration);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('HGETALL', '/redis/hgetall', 500, duration);
      this.logger.error('Redis hgetall error', error.message);
      this.metricsService.recordError('redis_hgetall');
      throw error;
    }
  }

  async publish(channel: string, message: string): Promise<void> {
    const start = Date.now();
    try {
      await this.client.publish(channel, message);
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('PUBLISH', '/redis/publish', 200, duration);
    } catch (error) {
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('PUBLISH', '/redis/publish', 500, duration);
      this.logger.error('Redis publish error', error.message);
      this.metricsService.recordError('redis_publish');
      throw error;
    }
  }

  async subscribe(channel: string, callback: (message: string) => void): Promise<void> {
    const start = Date.now();
    try {
      await this.client.subscribe(channel);
      this.client.on('message', (receivedChannel, message) => {
        if (receivedChannel === channel) {
          callback(message);
        }
      });
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('SUBSCRIBE', '/redis/subscribe', 200, duration);
    } catch (error) {
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('SUBSCRIBE', '/redis/subscribe', 500, duration);
      this.logger.error('Redis subscribe error', error.message);
      this.metricsService.recordError('redis_subscribe');
      throw error;
    }
  }

  async unsubscribe(channel: string): Promise<void> {
    const start = Date.now();
    try {
      await this.client.unsubscribe(channel);
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('UNSUBSCRIBE', '/redis/unsubscribe', 200, duration);
    } catch (error) {
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('UNSUBSCRIBE', '/redis/unsubscribe', 500, duration);
      this.logger.error('Redis unsubscribe error', error.message);
      this.metricsService.recordError('redis_unsubscribe');
      throw error;
    }
  }

  async executePipeline(commands: [string, ...any[]][]): Promise<any[]> {
    const start = Date.now();
    try {
      const pipeline = this.client.pipeline();
      commands.forEach(([command, ...args]) => {
        pipeline[command.toLowerCase()](...args);
      });
      const results = await pipeline.exec();
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('PIPELINE', '/redis/pipeline', 200, duration);
      return results.map(([err, result]) => {
        if (err) throw err;
        return result;
      });
    } catch (error) {
      const duration = Date.now() - start;
      this.metricsService.recordHttpMetric('PIPELINE', '/redis/pipeline', 500, duration);
      this.logger.error('Redis pipeline error', error.message);
      this.metricsService.recordError('redis_pipeline');
      throw error;
    }
  }

  async quit(): Promise<void> {
    try {
      await this.client.quit();
    } catch (error) {
      this.logger.error('Redis quit error', error.message);
      this.metricsService.recordError('redis_quit');
      throw error;
    }
  }
}
