import { PrismaClient } from '@prisma/client';
import { BaseRepository } from '../../../repositories/base.repository';
import { CreateReviewInput, UpdateReviewInput, ReviewParams, ReviewQuery } from '../schemas/review.schema';

export class ReviewRepository extends BaseRepository {
  constructor(private prisma: PrismaClient) {
    super();
  }

  async create(data: CreateReviewInput & { usuarioId: number }) {
    return this.prisma.avaliacao.create({
      data: {
        nota: data.nota,
        comentario: data.comentario,
        produtoId: data.produtoId,
        usuarioId: data.usuarioId,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        produto: {
          select: {
            id: true,
            nome: true,
            imagem: true,
          },
        },
      },
    });
  }

  async findById(id: number) {
    return this.prisma.avaliacao.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        produto: {
          select: {
            id: true,
            nome: true,
            imagem: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateReviewInput) {
    return this.prisma.avaliacao.update({
      where: { id },
      data: {
        nota: data.nota,
        comentario: data.comentario,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        produto: {
          select: {
            id: true,
            nome: true,
            imagem: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.avaliacao.delete({
      where: { id },
    });
  }

  async findByProductId(produtoId: number, { page = 1, limit = 10 }: ReviewQuery) {
    const skip = (page - 1) * limit;

    const [avaliacoes, total] = await Promise.all([
      this.prisma.avaliacao.findMany({
        where: { produtoId },
        include: {
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
        orderBy: { data: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.avaliacao.count({
        where: { produtoId },
      }),
    ]);

    return {
      avaliacoes,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByUserId(usuarioId: number, { page = 1, limit = 10 }: ReviewQuery) {
    const skip = (page - 1) * limit;

    const [avaliacoes, total] = await Promise.all([
      this.prisma.avaliacao.findMany({
        where: { usuarioId },
        include: {
          produto: {
            select: {
              id: true,
              nome: true,
              imagem: true,
            },
          },
        },
        orderBy: { data: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.avaliacao.count({
        where: { usuarioId },
      }),
    ]);

    return {
      avaliacoes,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async checkUserProductReview(usuarioId: number, produtoId: number) {
    return this.prisma.avaliacao.findFirst({
      where: {
        usuarioId,
        produtoId,
      },
    });
  }
} 