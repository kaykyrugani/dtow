import { Router } from 'express';
import { metricsRoute } from '../metrics/prometheus';
import { ensureAuthenticated } from '../middlewares/auth.middleware';

const metricsRouter = Router();

// Rota para expor métricas do Prometheus
// Protegida por autenticação para evitar acesso não autorizado
metricsRouter.get('/', ensureAuthenticated, metricsRoute);

export default metricsRouter; 