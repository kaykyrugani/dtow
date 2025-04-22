import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get Prometheus metrics' })
  async getMetrics(): Promise<string> {
    const metricsEnabled = this.configService.get<boolean>('metrics.enabled');
    if (!metricsEnabled) {
      return '# Metrics are disabled';
    }
    return await this.metricsService.getMetrics();
  }
}
