import { Module } from '@nestjs/common';
import { LoggingService } from '../../services/LoggingService';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
