import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { PaymentRedisService } from './services/payment-redis.service';
import { RedisModule } from '../redis/redis.module';
import { MetricsModule } from '../metrics/metrics.module';
import { MetricsService } from '../metrics/metrics.service';
import { CacheService } from '../cache/cache.service';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { ValidationMiddleware } from '../../middlewares/validation.middleware';
import { createPaymentSchema, refundPaymentSchema } from './schemas/payment.schema';

@Module({
  imports: [RedisModule, MetricsModule, ConfigModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentRedisService,
    MetricsService,
    CacheService,
    {
      provide: PrismaClient,
      useFactory: () => {
        const prisma = new PrismaClient();
        return prisma;
      },
    },
    {
      provide: ValidationMiddleware,
      useValue: new ValidationMiddleware(createPaymentSchema),
    },
  ],
  exports: [PaymentService, PaymentRedisService],
})
export class PaymentModule {}
