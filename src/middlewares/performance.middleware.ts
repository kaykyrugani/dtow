import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '../services/metrics.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware para medir duração de consultas ao banco de dados
export const databaseMetricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  // Interceptar o evento de finalização da resposta
  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = seconds * 1000 + nanoseconds / 1000000; // Converter para milissegundos

    // Registrar métrica de duração da consulta
    MetricsService.observeDatabaseQueryDuration(
      req.method,
      req.path.split('/')[1] || 'unknown',
      duration
    );
  });

  next();
};

// Middleware para medir uso de cache
export const cacheMetricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();
  let cacheHit = false;

  // Interceptar o evento de finalização da resposta
  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = seconds * 1000 + nanoseconds / 1000000; // Converter para milissegundos

    // Calcular taxa de acerto do cache
    const hitRatio = cacheHit ? 1 : 0;
    MetricsService.setCacheHitRatio(hitRatio);
  });

  // Marcar como cache hit se a resposta vier do cache
  if (res.getHeader('X-Cache')) {
    cacheHit = true;
  }

  next();
};

// Middleware para medir tempo de resposta da API
export const apiMetricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  // Interceptar o evento de finalização da resposta
  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = seconds * 1000 + nanoseconds / 1000000; // Converter para milissegundos

    // Registrar métricas HTTP
    MetricsService.incrementHttpRequests({
      method: req.method,
      path: req.path,
      status: res.statusCode
    });

    MetricsService.observeHttpDuration({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration
    });

    // Registrar erros HTTP
    if (res.statusCode >= 400) {
      MetricsService.incrementHttpRequestErrors({
        method: req.method,
        path: req.path,
        status: res.statusCode
      });
    }
  });

  next();
}; 