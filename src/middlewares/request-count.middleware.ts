import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '../services/MetricsService';

export const requestCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
  MetricsService.incrementRequestCount();
  next();
};
