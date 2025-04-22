import { RedisModuleOptions } from '@nestjs/redis';

export const redisConfig: RedisModuleOptions = {
  config: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB) || 0,
  },
};
