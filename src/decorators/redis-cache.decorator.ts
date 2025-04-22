import { RedisService } from '../modules/redis/redis.service';

export interface RedisCacheOptions {
  key?: string | ((...args: any[]) => string);
  ttl?: number | ((...args: any[]) => number);
  namespace?: string;
}

export function RedisCacheable(options: RedisCacheOptions = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const redisService = RedisService.getInstance();

      // Gerar chave do cache
      const key =
        typeof options.key === 'function'
          ? options.key(...args)
          : options.key || `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;

      // Gerar TTL
      const ttl = typeof options.ttl === 'function' ? options.ttl(...args) : options.ttl || 3600; // 1 hora padrão

      // Namespace
      const namespace = options.namespace || 'onlywave:prod';

      // Chave completa com namespace
      const fullKey = `${namespace}:${key}`;

      try {
        // Tentar obter do cache
        const cached = await redisService.get(fullKey);
        if (cached) {
          return JSON.parse(cached);
        }

        // Executar método original
        const result = await originalMethod.apply(this, args);

        // Salvar no cache
        await redisService.set(fullKey, JSON.stringify(result), ttl);

        return result;
      } catch (error) {
        // Em caso de erro no cache, executar método original
        return originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}
