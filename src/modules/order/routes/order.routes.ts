import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { validateSchema } from '../../../middlewares/validateSchema';
import { createOrderSchema, updateOrderStatusSchema } from '../dtos/order.dto';

const orderRouter = Router();

// Rotas protegidas
orderRouter.use(authMiddleware());

// Criar pedido
orderRouter.post('/', validateSchema(createOrderSchema), OrderController.create);

// Buscar pedido por ID
orderRouter.get('/:id', OrderController.findById);

// Listar pedidos do usuário
orderRouter.get('/usuario/:usuarioId', OrderController.findByUserId);

// Atualizar status do pedido
orderRouter.patch(
  '/:id/status',
  validateSchema(updateOrderStatusSchema),
  OrderController.updateStatus,
);

// Cancelar pedido
orderRouter.post('/:id/cancel', OrderController.cancel);

export { orderRouter };
