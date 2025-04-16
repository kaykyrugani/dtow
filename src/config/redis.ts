import { createClient } from 'redis';
import { logger } from './logger';
import { env } from './validateEnv';
import { cacheService } from '../services/cache.service';

const redisClient = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
});

redisClient.on('error', (err) => {
  logger.error('Erro na conexão com Redis:', err);
});

redisClient.on('connect', () => {
  logger.info('Conectado ao Redis com sucesso');
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    logger.error('Erro ao conectar ao Redis:', error);
    throw error;
  }
};

export const initializeRedis = async (): Promise<void> => {
  try {
    await cacheService.connect();
    logger.info('Redis inicializado com sucesso');
  } catch (error) {
    logger.error('Erro ao inicializar Redis:', error);
    throw error;
  }
};

export { redisClient }; 