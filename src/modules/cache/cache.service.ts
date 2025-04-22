import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CacheService {
  constructor(private readonly redisService: RedisService) {}

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redisService.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.redisService.set(key, JSON.stringify(value), ttl);
  }

  async del(key: string): Promise<void> {
    await this.redisService.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return this.redisService.exists(key);
  }
}
