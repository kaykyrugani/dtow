import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MetricsService } from '../../services/metrics.service';
import { MetricsController } from './metrics.controller';
import { metricsConfig } from '../../config/metrics.config';

@Module({
  imports: [ConfigModule.forFeature(metricsConfig)],
  controllers: [MetricsController],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
