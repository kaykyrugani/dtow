import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheService } from './cache.service';
import { cacheConfig } from '../config/cache.config';

@Module({
  imports: [ConfigModule.forFeature(cacheConfig)],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
