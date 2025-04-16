import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '../services/MetricsService';

export const errorCountMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  MetricsService.incrementErrorCount();
  next(err);
}; 