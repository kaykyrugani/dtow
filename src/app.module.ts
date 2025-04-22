import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { PaymentModule } from './modules/payment/payment.module';
import { envConfig } from './config/env.config';
import { throttlingConfig } from './config/throttling.config';
import { cacheConfig } from './config/cache.config';
import { loggerConfig } from './config/logger.config';
import { sentryConfig } from './config/sentry.config';
import { redisConfig } from './config/redis.config';
import { metricsConfig } from './config/metrics.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { validationSchema } from './config/env.validation';
import { RedisModule } from '@nestjs-modules/ioredis';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsModule } from './metrics/metrics.module';
import { swaggerConfig } from './config/swagger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        envConfig,
        throttlingConfig,
        cacheConfig,
        loggerConfig,
        sentryConfig,
        redisConfig,
        metricsConfig,
        swaggerConfig,
      ],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT') || '5432', 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          url: `redis://${configService.get('redis.host')}:${configService.get('redis.port')}`,
          password: configService.get('redis.password'),
          db: configService.get('redis.db'),
        },
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: parseInt(configService.get('THROTTLE_TTL') || '60', 10),
            limit: parseInt(configService.get('THROTTLE_LIMIT') || '100', 10),
          },
        ],
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        ttl: parseInt(configService.get('CACHE_TTL') || '3600', 10),
        max: parseInt(configService.get('CACHE_MAX') || '100', 10),
      }),
      inject: [ConfigService],
    }),
    PrometheusModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        enabled: configService.get('metrics.enabled'),
        port: configService.get('metrics.port'),
      }),
      inject: [ConfigService],
    }),
    PaymentModule,
    MetricsModule,
  ],
})
export class AppModule {}
