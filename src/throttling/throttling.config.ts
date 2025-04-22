import { registerAs } from '@nestjs/config';

export const throttlingConfig = registerAs('throttling', () => ({
  ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
  limit: parseInt(process.env.THROTTLE_LIMIT || '100', 10),
}));
