import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { ReviewService } from '../services/review.service';
import { createReviewSchema, updateReviewSchema } from '../dtos/review.dto';

export class ReviewController {
  private static reviewService = container.resolve(ReviewService);

  static async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { produtoId } = req.params;
      const usuarioId = req.user.id;
      const data = createReviewSchema.parse(req.body);

      const review = await ReviewController.reviewService.createReview(
        produtoId,
        usuarioId,
        data
      );

      return res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }

  static async updateReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const usuarioId = req.user.id;
      const data = updateReviewSchema.parse(req.body);

      const review = await ReviewController.reviewService.updateReview(
        id,
        usuarioId,
        data
      );

      return res.json(review);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const usuarioId = req.user.id;

      await ReviewController.reviewService.deleteReview(id, usuarioId);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async getProductReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { produtoId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const reviews = await ReviewController.reviewService.getProductReviews(
        produtoId,
        page,
        limit
      );

      return res.json(reviews);
    } catch (error) {
      next(error);
    }
  }

  static async getAllReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const reviews = await ReviewController.reviewService.getAllReviews(
        page,
        limit
      );

      return res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
} 