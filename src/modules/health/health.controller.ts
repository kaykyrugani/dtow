import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Verificar saúde da aplicação' })
  @ApiResponse({
    status: 200,
    description: 'Aplicação está saudável',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2024-04-17T12:00:00Z',
        services: {
          database: 'up',
          redis: 'up',
          mercadoPago: 'up',
        },
      },
    },
  })
  async check() {
    return this.healthService.check();
  }
}
