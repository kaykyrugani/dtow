import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '../services/metrics.service';

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, path } = req;
    const status = res.statusCode;

    MetricsService.incrementHttpRequests({ method, path, status });
    MetricsService.observeHttpDuration({ method, path, status, duration });
  });

  next();
}; 