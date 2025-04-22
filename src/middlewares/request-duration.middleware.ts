import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '../modules/metrics/metrics.service';

export function requestDurationMiddleware(metricsService: MetricsService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = (Date.now() - start) / 1000; // Converter para segundos
      metricsService.observeRequestDuration(
        req.method,
        req.route?.path || req.path,
        res.statusCode,
        duration,
      );
    });

    next();
  };
}
