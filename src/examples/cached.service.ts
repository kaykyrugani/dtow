import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CachedService {
  constructor(private readonly cacheService: CacheService) {}

  async getCachedData(key: string): Promise<any> {
    return await this.cacheService.wrap(
      `data:${key}`,
      async () => {
        // Simula uma operação cara
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { data: `Dados para ${key}`, timestamp: new Date().toISOString() };
      },
      3600, // Cache por 1 hora
    );
  }

  async invalidateCache(key: string): Promise<void> {
    await this.cacheService.del(`data:${key}`);
  }
}
