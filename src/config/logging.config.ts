import { registerAs } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

export const loggingConfig = registerAs('logging', () => {
  const configService = new ConfigService();

  return {
    level: configService.get<string>('LOG_LEVEL'),
    format: configService.get<string>('LOG_FORMAT'),
  };
});
