import { Controller, Get } from '@nestjs/common';
import { MetricsService } from '../../services/metrics.service';
import { register } from 'prom-client';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics() {
    return register.metrics();
  }
}
