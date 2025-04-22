import { Module } from '@nestjs/common';
import { CachedService } from './cached.service';
import { CachedController } from './cached.controller';
import { LoggedService } from './logged.service';
import { LoggedController } from './logged.controller';
import { CompressedController } from './compressed.controller';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule],
  controllers: [CachedController, LoggedController, CompressedController],
  providers: [CachedService, LoggedService],
})
export class ExamplesModule {}
