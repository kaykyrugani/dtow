import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { ReviewService } from '../services/review.service';
import { AppError } from '../../../utils/AppError';
import { CreateReviewInput, UpdateReviewInput, ReviewQuery } from '../schemas/review.schema';

export class ReviewController {
  private reviewService: ReviewService;
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.reviewService = new ReviewService(this.prisma);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw AppError.unauthorized('Usuário não autenticado');
      }

      const reviewData = req.body as CreateReviewInput;
      const review = await this.reviewService.create(userId, reviewData);
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const review = await this.reviewService.findById(id);
      res.json(review);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw AppError.unauthorized('Usuário não autenticado');
      }

      const id = parseInt(req.params.id, 10);
      const reviewData = req.body as UpdateReviewInput;
      const review = await this.reviewService.update(id, userId, reviewData);
      res.json(review);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw AppError.unauthorized('Usuário não autenticado');
      }

      const id = parseInt(req.params.id, 10);
      await this.reviewService.delete(id, userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async findByProductId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const produtoId = parseInt(req.params.produtoId, 10);
      const query = req.query as unknown as ReviewQuery;
      const reviews = await this.reviewService.findByProductId(produtoId, query);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }

  async findByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw AppError.unauthorized('Usuário não autenticado');
      }

      const query = req.query as unknown as ReviewQuery;
      const reviews = await this.reviewService.findByUserId(userId, query);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
} 