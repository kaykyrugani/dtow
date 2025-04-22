import { injectable } from 'tsyringe';
import Redis from 'ioredis';
import { config } from '../config';
import { LoggingService } from './LoggingService';

@injectable()
export class CacheService {
  private static instance: CacheService;
  private readonly redis: Redis;
  private readonly logger = LoggingService.getInstance();
  private readonly DEFAULT_TTL = 3600; // 1 hora

  constructor() {
    this.redis = new Redis({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password,
      retryStrategy: times => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.redis.on('error', error => {
      this.logger.error('Redis connection error', { error });
    });

    this.redis.on('connect', () => {
      this.logger.info('Redis connected successfully');
    });
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      this.logger.error('Error getting value from cache', { error, key });
      return null;
    }
  }

  public async set<T>(key: string, value: T, ttl: number = this.DEFAULT_TTL): Promise<void> {
    try {
      await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    } catch (error) {
      this.logger.error('Error setting value in cache', { error, key });
    }
  }

  public async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      this.logger.error('Error deleting value from cache', { error, key });
    }
  }

  public async exists(key: string): Promise<boolean> {
    try {
      const exists = await this.redis.exists(key);
      return exists === 1;
    } catch (error) {
      this.logger.error('Error checking key existence in cache', { error, key });
      return false;
    }
  }
}
