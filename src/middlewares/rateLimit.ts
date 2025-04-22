import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

// Armazenamento em memória para controle de requisições
// Em produção, considere usar Redis ou outro armazenamento distribuído
const requestStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Middleware para limitar a taxa de requisições
 * @param windowMs Janela de tempo em milissegundos (padrão: 15 minutos)
 * @param max Número máximo de requisições por IP na janela de tempo (padrão: 100)
 */
export const rateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const ip = req.ip || req.connection.remoteAddress || 'unknown';
      const now = Date.now();

      // Limpa entradas expiradas
      for (const [key, value] of requestStore.entries()) {
        if (value.resetTime < now) {
          requestStore.delete(key);
        }
      }

      // Obtém ou inicializa o contador para este IP
      const requestData = requestStore.get(ip) || { count: 0, resetTime: now + windowMs };

      // Verifica se o contador foi resetado
      if (requestData.resetTime < now) {
        requestData.count = 0;
        requestData.resetTime = now + windowMs;
      }

      // Incrementa o contador
      requestData.count++;
      requestStore.set(ip, requestData);

      // Define headers para o cliente
      res.setHeader('X-RateLimit-Limit', max.toString());
      res.setHeader('X-RateLimit-Remaining', Math.max(0, max - requestData.count).toString());
      res.setHeader('X-RateLimit-Reset', Math.ceil(requestData.resetTime / 1000).toString());

      // Verifica se o limite foi excedido
      if (requestData.count > max) {
        throw new AppError('Muitas requisições, tente novamente mais tarde', 429);
      }

      // Se o limite não foi excedido, continua o processamento
      next();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Erro ao processar requisição' });
    }
  };
};
