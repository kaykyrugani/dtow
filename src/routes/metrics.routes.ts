import { Router } from 'express';
import { MetricsService } from '../services/metrics.service';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const metricsService = MetricsService.getInstance();

// Rota protegida que requer autenticação de admin
router.get('/metrics', authMiddleware, (req, res) => {
  res.set('Content-Type', metricsService.getContentType());
  res.end(metricsService.getMetrics());
});

export default router; 