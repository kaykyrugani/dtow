import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { PrismaModule } from '../../modules/prisma/prisma.module';
import { RedisModule } from '../../modules/redis/redis.module';
import { PaymentModule } from '../../modules/payment/payment.module';

@Module({
  imports: [PrismaModule, RedisModule, PaymentModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
