import { Request, Response, NextFunction } from 'express';
import { RateLimitService } from '../services/rate-limit.service';
import { AppError } from '../errors/AppError';
import { LoggingService } from '../services/LoggingService';

const logger = LoggingService.getInstance();

/**
 * Middleware para limitar a taxa de requisições usando Redis
 * @param windowMs Janela de tempo em milissegundos (padrão: 15 minutos)
 * @param max Número máximo de requisições por IP na janela de tempo (padrão: 100)
 * @param keyGenerator Função para gerar a chave de limite (padrão: IP do cliente)
 */
export const rateLimitMiddleware = (
  windowMs = 15 * 60 * 1000,
  max = 100,
  keyGenerator = (req: Request) => req.ip || req.connection.remoteAddress || 'unknown',
) => {
  const rateLimitService = RateLimitService.getInstance();

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = keyGenerator(req);
      const { allowed, remaining, resetTime } = await rateLimitService.checkLimit(
        key,
        windowMs,
        max,
      );

      // Define headers para o cliente
      res.setHeader('X-RateLimit-Limit', max.toString());
      res.setHeader('X-RateLimit-Remaining', remaining.toString());
      res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString());

      // Verifica se o limite foi excedido
      if (!allowed) {
        logger.warn('Limite de taxa excedido', { key, remaining });
        throw new AppError('Muitas requisições, tente novamente mais tarde', 429);
      }

      // Se o limite não foi excedido, continua o processamento
      next();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      logger.error('Erro ao processar rate limiting', { error });
      return res.status(500).json({ error: 'Erro ao processar requisição' });
    }
  };
};
