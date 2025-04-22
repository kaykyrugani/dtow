import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { adminMiddleware } from '../../../middlewares/admin.middleware';

const router = Router();

// Rotas de avaliações
router.get(
  '/reviews/pending',
  authMiddleware,
  adminMiddleware,
  ReviewController.listPendingReviews,
);
router.post(
  '/reviews/:id/approve',
  authMiddleware,
  adminMiddleware,
  ReviewController.approveReview,
);
router.post('/reviews/:id/reject', authMiddleware, adminMiddleware, ReviewController.rejectReview);
router.get('/reviews/stats', authMiddleware, adminMiddleware, ReviewController.getReviewStats);

export default router;
