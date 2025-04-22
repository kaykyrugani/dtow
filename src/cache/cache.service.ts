import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../modules/redis/redis.service';
import { LoggerService } from '../logging/logger.service';

@Injectable()
export class CacheService {
  constructor(
    private configService: ConfigService,
    private redisService: RedisService,
    private logger: LoggerService,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redisService.get(this.getKeyWithPrefix(key));
      return value ? JSON.parse(value) : null;
    } catch (error) {
      this.logger.error(`Error getting cache key ${key}:`, error.stack);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      const cacheTtl = ttl || this.configService.get('cache.ttl');
      await this.redisService.set(this.getKeyWithPrefix(key), serializedValue, cacheTtl);
    } catch (error) {
      this.logger.error(`Error setting cache key ${key}:`, error.stack);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redisService.del(this.getKeyWithPrefix(key));
    } catch (error) {
      this.logger.error(`Error deleting cache key ${key}:`, error.stack);
    }
  }

  async reset(): Promise<void> {
    // This method is not implemented in the new CacheService
  }

  async wrap<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) {
      return cached;
    }

    const result = await fn();
    await this.set(key, result, ttl);
    return result;
  }

  private getKeyWithPrefix(key: string): string {
    const prefix = this.configService.get('cache.prefix');
    return `${prefix}${key}`;
  }
}
