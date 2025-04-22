import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../utils/AppError';

const prisma = new PrismaClient();

export class ReviewController {
  static async listPendingReviews(req: Request, res: Response) {
    try {
      const reviews = await prisma.avaliacao.findMany({
        where: {
          status: 'PENDING',
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
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.json(reviews);
    } catch (error) {
      throw new AppError('Erro ao listar avaliações pendentes', 500);
    }
  }

  static async approveReview(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const review = await prisma.avaliacao.update({
        where: { id },
        data: {
          status: 'APPROVED',
          reviewedBy: req.user.id,
          reviewedAt: new Date(),
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

      // TODO: Enviar notificação por email para o usuário

      return res.json(review);
    } catch (error) {
      throw new AppError('Erro ao aprovar avaliação', 500);
    }
  }

  static async rejectReview(req: Request, res: Response) {
    const { id } = req.params;
    const { reason } = req.body;

    try {
      const review = await prisma.avaliacao.update({
        where: { id },
        data: {
          status: 'REJECTED',
          reviewedBy: req.user.id,
          reviewedAt: new Date(),
          rejectionReason: reason,
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

      // TODO: Enviar notificação por email para o usuário

      return res.json(review);
    } catch (error) {
      throw new AppError('Erro ao rejeitar avaliação', 500);
    }
  }

  static async getReviewStats(req: Request, res: Response) {
    try {
      const stats = await prisma.avaliacao.groupBy({
        by: ['status'],
        _count: {
          id: true,
        },
      });

      const totalReviews = await prisma.avaliacao.count();
      const averageRating = await prisma.avaliacao.aggregate({
        _avg: {
          nota: true,
        },
      });

      return res.json({
        stats,
        totalReviews,
        averageRating: averageRating._avg.nota,
      });
    } catch (error) {
      throw new AppError('Erro ao obter estatísticas de avaliações', 500);
    }
  }
}
