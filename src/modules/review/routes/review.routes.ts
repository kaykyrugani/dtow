import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { validateSchema } from '../../../middlewares/validateSchema';
import {
  createReviewSchema,
  updateReviewSchema,
  deleteReviewSchema,
  getReviewByIdSchema,
  getReviewsByProductSchema,
  getReviewsByUserSchema
} from '../schemas/review.schema';

const reviewRouter = Router();

// Rotas públicas
reviewRouter.get('/produto/:produtoId', ReviewController.findByProductId);
reviewRouter.get('/usuario/:usuarioId', ReviewController.findByUserId);
reviewRouter.get('/:id', ReviewController.findById);

// Middleware de autenticação
reviewRouter.use(authMiddleware());

// Rotas protegidas
reviewRouter.post('/', validateSchema(createReviewSchema), ReviewController.create);
reviewRouter.put('/:id', validateSchema(updateReviewSchema), ReviewController.update);
reviewRouter.delete('/:id', validateSchema(deleteReviewSchema), ReviewController.delete);

export { reviewRouter }; 