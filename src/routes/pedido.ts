import { Router } from 'express';
import { PedidoController } from '../controllers/pedidoController';
import { authMiddleware } from '../middlewares/auth';
import { validarSchema } from '../middlewares/validator';
import { pedidoSchema } from '../schemas/pedidoSchemas';

const pedidoRouter = Router();

pedidoRouter.use(authMiddleware);

pedidoRouter.post('/', validarSchema(pedidoSchema), PedidoController.criar);
pedidoRouter.get('/', PedidoController.listar);
pedidoRouter.get('/:id', PedidoController.obterPorId);

export { pedidoRouter };
