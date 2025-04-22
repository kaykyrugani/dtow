import { Request, Response, NextFunction } from 'express';
import { cacheService } from '../services/cache.service';
import { logger } from '../config/logger';

export const cacheMiddleware = (ttl: number = 3600) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Não cachear requisições que não são GET
      if (req.method !== 'GET') {
        return next();
      }

      const key = `cache:${req.originalUrl}`;
      const cachedData = await cacheService.get(key);

      if (cachedData) {
        logger.info(`Cache hit para ${key}`);
        return res.json(cachedData);
      }

      // Sobrescreve o método json para capturar a resposta
      const originalJson = res.json;
      res.json = function (body: unknown) {
        cacheService.set(key, body, ttl).catch(error => {
          logger.error('Erro ao salvar no cache:', error);
        });
        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      logger.error('Erro no middleware de cache:', error);
      next();
    }
  };
};
