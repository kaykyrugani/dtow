import { PrismaClient } from '@prisma/client';
import { ReviewRepository } from '../repositories/review.repository';
import { AppError } from '../../../utils/AppError';
import { CreateReviewInput, UpdateReviewInput, ReviewParams, ReviewQuery } from '../schemas/review.schema';
import { HttpStatusCode } from '../../../constants/httpStatusCode';

export class ReviewService {
  private reviewRepository: ReviewRepository;

  constructor(private prisma: PrismaClient) {
    this.reviewRepository = new ReviewRepository(prisma);
  }

  async create(userId: number, data: CreateReviewInput) {
    // Verificar se o usuário já avaliou este produto
    const existingReview = await this.reviewRepository.checkUserProductReview(userId, data.produtoId);
    if (existingReview) {
      throw new AppError('Você já avaliou este produto', HttpStatusCode.CONFLICT);
    }

    // Verificar se o produto existe
    const product = await this.prisma.produto.findUnique({
      where: { id: data.produtoId },
    });

    if (!product) {
      throw new AppError('Produto não encontrado', HttpStatusCode.NOT_FOUND);
    }

    return this.reviewRepository.create({ ...data, usuarioId: userId });
  }

  async findById(id: number) {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new AppError('Avaliação não encontrada', HttpStatusCode.NOT_FOUND);
    }
    return review;
  }

  async update(id: number, userId: number, data: UpdateReviewInput) {
    const review = await this.reviewRepository.findById(id);
    
    if (!review) {
      throw new AppError('Avaliação não encontrada', HttpStatusCode.NOT_FOUND);
    }

    // Verificar se o usuário é o dono da avaliação
    if (review.usuarioId !== userId) {
      throw new AppError('Você não tem permissão para atualizar esta avaliação', HttpStatusCode.FORBIDDEN);
    }

    return this.reviewRepository.update(id, data);
  }

  async delete(id: number, userId: number) {
    const review = await this.reviewRepository.findById(id);
    
    if (!review) {
      throw new AppError('Avaliação não encontrada', HttpStatusCode.NOT_FOUND);
    }

    // Verificar se o usuário é o dono da avaliação
    if (review.usuarioId !== userId) {
      throw new AppError('Você não tem permissão para excluir esta avaliação', HttpStatusCode.FORBIDDEN);
    }

    return this.reviewRepository.delete(id);
  }

  async findByProductId(produtoId: number, query: ReviewQuery) {
    // Verificar se o produto existe
    const product = await this.prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!product) {
      throw new AppError('Produto não encontrado', HttpStatusCode.NOT_FOUND);
    }

    return this.reviewRepository.findByProductId(produtoId, query);
  }

  async findByUserId(userId: number, query: ReviewQuery) {
    return this.reviewRepository.findByUserId(userId, query);
  }
} 