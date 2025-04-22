import { registerAs } from '@nestjs/config';

export const cacheConfig = registerAs('cache', () => ({
  ttl: parseInt(process.env.CACHE_TTL || '3600', 10),
  max: parseInt(process.env.CACHE_MAX || '100', 10),
}));
