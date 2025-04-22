import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './logger.service';
import { loggingConfig } from '../config/logging.config';

@Global()
@Module({
  imports: [ConfigModule.forFeature(loggingConfig)],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggingModule {}
