import { injectable } from 'tsyringe';
import { PrismaClient, StatusAvaliacao } from '@prisma/client';
import { CreateReviewDTO, UpdateReviewDTO } from '../dtos/review.dto';
import { AppError } from '../../../shared/errors/AppError';

@injectable()
export class ReviewService {
  constructor(private prisma: PrismaClient) {}

  async createReview(produtoId: string, usuarioId: string, data: CreateReviewDTO) {
    const produto = await this.prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produto) {
      throw new AppError('Produto não encontrado', 404);
    }

    const review = await this.prisma.avaliacao.create({
      data: {
        produtoId,
        usuarioId,
        nota: data.nota,
        comentario: data.comentario,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        produto: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    await this.updateProductRating(produtoId);

    return review;
  }

  async updateReview(id: string, usuarioId: string, data: UpdateReviewDTO) {
    const review = await this.prisma.avaliacao.findUnique({
      where: { id },
      include: { produto: true },
    });

    if (!review) {
      throw new AppError('Avaliação não encontrada', 404);
    }

    if (review.usuarioId !== usuarioId) {
      throw new AppError('Não autorizado', 403);
    }

    const updatedReview = await this.prisma.avaliacao.update({
      where: { id },
      data: {
        nota: data.nota,
        comentario: data.comentario,
        status: data.status as StatusAvaliacao,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        produto: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    await this.updateProductRating(review.produtoId);

    return updatedReview;
  }

  async deleteReview(id: string, usuarioId: string) {
    const review = await this.prisma.avaliacao.findUnique({
      where: { id },
      include: { produto: true },
    });

    if (!review) {
      throw new AppError('Avaliação não encontrada', 404);
    }

    if (review.usuarioId !== usuarioId) {
      throw new AppError('Não autorizado', 403);
    }

    await this.prisma.avaliacao.delete({
      where: { id },
    });

    await this.updateProductRating(review.produtoId);
  }

  async getProductReviews(produtoId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.avaliacao.findMany({
        where: {
          produtoId,
          status: 'APROVADA',
        },
        include: {
          usuario: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.avaliacao.count({
        where: {
          produtoId,
          status: 'APROVADA',
        },
      }),
    ]);

    return {
      reviews,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async getAllReviews(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.avaliacao.findMany({
        include: {
          usuario: {
            select: {
              id: true,
              nome: true,
            },
          },
          produto: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.avaliacao.count(),
    ]);

    return {
      reviews,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  private async updateProductRating(produtoId: string) {
    const reviews = await this.prisma.avaliacao.findMany({
      where: {
        produtoId,
        status: 'APROVADA',
      },
      select: {
        nota: true,
      },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0 ? reviews.reduce((acc, review) => acc + review.nota, 0) / totalReviews : 0;

    await this.prisma.produto.update({
      where: { id: produtoId },
      data: {
        mediaAvaliacoes: averageRating,
        totalAvaliacoes: totalReviews,
      },
    });
  }
}
