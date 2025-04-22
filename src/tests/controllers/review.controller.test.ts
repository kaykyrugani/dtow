import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { ReviewController } from '../../modules/review/controllers/review.controller';
import { ReviewService } from '../../modules/review/services/review.service';
import { container } from 'tsyringe';
import { AppError } from '../../shared/errors/AppError';

vi.mock('../../modules/review/services/review.service');

describe('ReviewController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: any;
  let reviewService: ReviewService;

  beforeEach(() => {
    mockRequest = {
      params: {},
      query: {},
      body: {},
      user: { id: 'user-1' },
    };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    mockNext = vi.fn();
    reviewService = container.resolve(ReviewService);
  });

  describe('createReview', () => {
    it('should create a review successfully', async () => {
      const reviewData = {
        nota: 5,
        comentario: 'Ótimo produto!',
      };
      mockRequest.params = { produtoId: 'produto-1' };
      mockRequest.body = reviewData;

      const mockReview = {
        id: 'review-1',
        ...reviewData,
        usuario: { id: 'user-1', nome: 'Test User' },
        produto: { id: 'produto-1', nome: 'Test Product' },
        status: 'PENDENTE',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.spyOn(reviewService, 'createReview').mockResolvedValue(mockReview);

      await ReviewController.createReview(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockReview);
    });

    it('should handle errors when creating a review', async () => {
      mockRequest.params = { produtoId: 'produto-1' };
      mockRequest.body = { nota: 5 };

      vi.spyOn(reviewService, 'createReview').mockRejectedValue(
        new AppError('Produto não encontrado', 404),
      );

      await ReviewController.createReview(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    });
  });

  describe('updateReview', () => {
    it('should update a review successfully', async () => {
      const updateData = {
        nota: 4,
        comentario: 'Produto atualizado!',
      };
      mockRequest.params = { id: 'review-1' };
      mockRequest.body = updateData;

      const mockUpdatedReview = {
        id: 'review-1',
        ...updateData,
        usuario: { id: 'user-1', nome: 'Test User' },
        produto: { id: 'produto-1', nome: 'Test Product' },
        status: 'APROVADA',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.spyOn(reviewService, 'updateReview').mockResolvedValue(mockUpdatedReview);

      await ReviewController.updateReview(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedReview);
    });
  });

  describe('deleteReview', () => {
    it('should delete a review successfully', async () => {
      mockRequest.params = { id: 'review-1' };

      vi.spyOn(reviewService, 'deleteReview').mockResolvedValue(undefined);

      await ReviewController.deleteReview(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });
  });

  describe('getProductReviews', () => {
    it('should get product reviews successfully', async () => {
      mockRequest.params = { produtoId: 'produto-1' };
      mockRequest.query = { page: '1', limit: '10' };

      const mockReviews = {
        reviews: [
          {
            id: 'review-1',
            nota: 5,
            comentario: 'Ótimo produto!',
            usuario: { id: 'user-1', nome: 'Test User' },
            status: 'APROVADA',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        total: 1,
        pages: 1,
        currentPage: 1,
      };

      vi.spyOn(reviewService, 'getProductReviews').mockResolvedValue(mockReviews);

      await ReviewController.getProductReviews(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.json).toHaveBeenCalledWith(mockReviews);
    });
  });

  describe('getAllReviews', () => {
    it('should get all reviews successfully', async () => {
      mockRequest.query = { page: '1', limit: '10' };

      const mockReviews = {
        reviews: [
          {
            id: 'review-1',
            nota: 5,
            comentario: 'Ótimo produto!',
            usuario: { id: 'user-1', nome: 'Test User' },
            produto: { id: 'produto-1', nome: 'Test Product' },
            status: 'APROVADA',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        total: 1,
        pages: 1,
        currentPage: 1,
      };

      vi.spyOn(reviewService, 'getAllReviews').mockResolvedValue(mockReviews);

      await ReviewController.getAllReviews(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.json).toHaveBeenCalledWith(mockReviews);
    });
  });
});
