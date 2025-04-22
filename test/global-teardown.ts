import { RedisService } from '../src/modules/redis/redis.service';
import { createLogger } from '../src/config/logger.config';

const logger = createLogger();

export default async function globalTeardown() {
  try {
    // Desconecta do Redis
    const redisService = new RedisService();
    await redisService.quit();
    
    logger.info('Ambiente de teste limpo com sucesso');
  } catch (error) {
    logger.error('Erro ao limpar ambiente de teste', error);
    throw error;
  }
} 