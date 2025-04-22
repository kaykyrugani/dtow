import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '../modules/metrics/metrics.service';

export function errorCountMiddleware(metricsService: MetricsService) {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    metricsService.incrementErrorCount(err.name);
    next(err);
  };
}
