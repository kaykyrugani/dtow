import { registerAs } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

export const throttlingConfig = registerAs('throttling', () => {
  const configService = new ConfigService();

  return {
    ttl: configService.get<number>('THROTTLE_TTL'),
    limit: configService.get<number>('THROTTLE_LIMIT'),
  };
});
