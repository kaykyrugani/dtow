import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { ensureAuthenticated } from '../../../shared/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../../../shared/middlewares/ensureAdmin';
import { cacheMiddleware } from '../../../middlewares/cache.middleware';

const reviewRouter = Router();

// Rotas públicas com cache
reviewRouter.get(
  '/products/:produtoId/reviews',
  cacheMiddleware(1800),
  ReviewController.getProductReviews,
);

// Rotas protegidas (sem cache)
reviewRouter.post(
  '/products/:produtoId/reviews',
  ensureAuthenticated,
  ReviewController.createReview,
);
reviewRouter.put('/reviews/:reviewId', ensureAuthenticated, ReviewController.updateReview);
reviewRouter.delete('/reviews/:reviewId', ensureAuthenticated, ReviewController.deleteReview);

// Rotas de administrador (sem cache)
reviewRouter.get('/admin/reviews', ensureAdmin, ReviewController.getAllReviews);
reviewRouter.put(
  '/admin/reviews/:reviewId/status',
  ensureAdmin,
  ReviewController.updateReviewStatus,
);

export default reviewRouter;
