import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const rateLimitConfig: ThrottlerModuleOptions = {
  throttlers: [
    {
      ttl: parseInt(process.env.THROTTLE_TTL) || 60,
      limit: parseInt(process.env.THROTTLE_LIMIT) || 10,
    },
  ],
}; 