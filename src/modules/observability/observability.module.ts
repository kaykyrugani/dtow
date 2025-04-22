import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from '../../services/logger.service';
import { ObservabilityService } from './observability.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [LoggerService, ObservabilityService],
  exports: [LoggerService, ObservabilityService],
})
export class ObservabilityModule {}
