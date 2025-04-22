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
import { RedisModule } from '@nestjs/redis';
import { PrometheusModule } from '@nestjs/prometheus';
import { MetricsModule } from './metrics/metrics.module';
import { swaggerConfig } from './config/swagger.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { typeOrmConfig } from './config/typeorm.config';
import { jwtConfig } from './config/jwt.config';
import { JwtStrategy } from './config/passport.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { prometheusConfig } from './config/prometheus.config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';
import { rateLimitConfig } from './config/rate-limit.config';

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
      imports: [ConfigModule],
      useFactory: () => typeOrmConfig,
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => redisConfig,
      useFactory: (configService: ConfigService) => ({
        config: {
          url: `redis://${configService.get('redis.host')}:${configService.get('redis.port')}`,
          password: configService.get('redis.password'),
          db: configService.get('redis.db'),
        },
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot(rateLimitConfig),
    CacheModule.register(cacheConfig),
    PrometheusModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        enabled: configService.get('metrics.enabled'),
        port: configService.get('metrics.port'),
      }),
      inject: [ConfigService],
    }),
    PaymentModule,
    MetricsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => jwtConfig,
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    AuthModule,
    WinstonModule.forRoot(winstonConfig),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
