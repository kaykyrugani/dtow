import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '../services/MetricsService';

export const responseTimeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    MetricsService.recordResponseTime(
      duration,
      req.method,
      req.route?.path || req.path,
      res.statusCode,
    );
  });

  next();
};
