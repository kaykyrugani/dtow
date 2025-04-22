import { ConfigService } from '@nestjs/config';
import { RedisService } from '../src/modules/redis/redis.service';
import { createLogger } from '../src/config/logger.config';
import { MetricsService } from '../src/metrics/metrics.service';

const logger = createLogger();

export default async function globalSetup() {
  try {
    const configService = new ConfigService();
    const metricsService = new MetricsService(configService);
    const redisService = new RedisService(configService, metricsService);

    // Limpa o banco de dados de testes
    await redisService.executePipeline([['flushall']]);

    logger.info('Ambiente de teste configurado com sucesso');
  } catch (error) {
    logger.error('Erro ao configurar ambiente de teste', error);
    throw error;
  }
}
