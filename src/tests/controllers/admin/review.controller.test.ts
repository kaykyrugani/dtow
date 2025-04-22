import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ReviewController } from '../../../modules/admin/controllers/review.controller';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../utils/AppError';

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => ({
    avaliacao: {
      findMany: vi.fn(),
      update: vi.fn(),
      groupBy: vi.fn(),
      count: vi.fn(),
      aggregate: vi.fn(),
    },
  })),
}));

describe('ReviewController', () => {
  let prisma: PrismaClient;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    prisma = new PrismaClient();
    mockReq = {
      user: { id: '1', tipoUsuario: 'ADMIN' },
      params: {},
      body: {},
    };
    mockRes = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
    };
  });

  describe('listPendingReviews', () => {
    it('should return pending reviews', async () => {
      const mockReviews = [{ id: '1', status: 'PENDING' }];

      vi.mocked(prisma.avaliacao.findMany).mockResolvedValue(mockReviews);

      await ReviewController.listPendingReviews(mockReq, mockRes);

      expect(prisma.avaliacao.findMany).toHaveBeenCalledWith({
        where: { status: 'PENDING' },
        include: {
          produto: true,
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      expect(mockRes.json).toHaveBeenCalledWith(mockReviews);
    });

    it('should throw error when database fails', async () => {
      vi.mocked(prisma.avaliacao.findMany).mockRejectedValue(new Error('Database error'));

      await expect(ReviewController.listPendingReviews(mockReq, mockRes)).rejects.toThrow(AppError);
    });
  });

  describe('approveReview', () => {
    it('should approve a review', async () => {
      const mockReview = { id: '1', status: 'APPROVED' };
      mockReq.params.id = '1';

      vi.mocked(prisma.avaliacao.update).mockResolvedValue(mockReview);

      await ReviewController.approveReview(mockReq, mockRes);

      expect(prisma.avaliacao.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          status: 'APPROVED',
          reviewedBy: '1',
          reviewedAt: expect.any(Date),
        },
        include: {
          produto: true,
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
      });

      expect(mockRes.json).toHaveBeenCalledWith(mockReview);
    });
  });

  describe('rejectReview', () => {
    it('should reject a review with reason', async () => {
      const mockReview = { id: '1', status: 'REJECTED' };
      mockReq.params.id = '1';
      mockReq.body.reason = 'Conteúdo inadequado';

      vi.mocked(prisma.avaliacao.update).mockResolvedValue(mockReview);

      await ReviewController.rejectReview(mockReq, mockRes);

      expect(prisma.avaliacao.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          status: 'REJECTED',
          reviewedBy: '1',
          reviewedAt: expect.any(Date),
          rejectionReason: 'Conteúdo inadequado',
        },
        include: {
          produto: true,
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
      });

      expect(mockRes.json).toHaveBeenCalledWith(mockReview);
    });
  });

  describe('getReviewStats', () => {
    it('should return review statistics', async () => {
      const mockStats = [
        { status: 'PENDING', _count: { id: 5 } },
        { status: 'APPROVED', _count: { id: 10 } },
        { status: 'REJECTED', _count: { id: 2 } },
      ];

      vi.mocked(prisma.avaliacao.groupBy).mockResolvedValue(mockStats);
      vi.mocked(prisma.avaliacao.count).mockResolvedValue(17);
      vi.mocked(prisma.avaliacao.aggregate).mockResolvedValue({
        _avg: { nota: 4.5 },
      });

      await ReviewController.getReviewStats(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        stats: mockStats,
        totalReviews: 17,
        averageRating: 4.5,
      });
    });
  });
});
