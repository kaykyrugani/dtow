import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerOptions } from '@nestjs/throttler';
import { throttlingConfig } from '../config/throttling.config';

@Module({
  imports: [
    ConfigModule.forFeature(throttlingConfig),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): ThrottlerOptions[] => {
        const ttl = configService.get<number>('THROTTLE_TTL') || 60;
        const limit = configService.get<number>('THROTTLE_LIMIT') || 100;

        return [
          {
            ttl,
            limit,
          },
        ];
      },
      inject: [ConfigService],
    }),
  ],
})
export class ThrottlingModule {}
