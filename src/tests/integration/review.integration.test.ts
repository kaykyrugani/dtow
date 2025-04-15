import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { ReviewService } from '../../modules/review/services/review.service';
import { AppError } from '../../utils/AppError';
import { ERROR_CODES } from '../../constants/errorMessages';
import { HttpStatusCode } from '../../constants/httpCodes';
import { createTestUser, createTestProduct } from '../helpers/testData';
import { mockPrisma } from '../mocks/prisma.mock';

describe('Review Integration Tests', () => {
  let reviewService: ReviewService;
  let prisma: PrismaClient;
  let testUser: any;
  let testProduct: any;

  beforeEach(async () => {
    prisma = container.resolve(PrismaClient);
    reviewService = container.resolve(ReviewService);
    
    // Criar usuário e produto de teste
    testUser = await createTestUser(prisma);
    testProduct = await createTestProduct(prisma);
  });

  afterEach(async () => {
    await prisma.avaliacao.deleteMany();
    await prisma.produto.deleteMany();
    await prisma.usuario.deleteMany();
  });

  describe('create', () => {
    it('deve criar uma avaliação com sucesso', async () => {
      const reviewData = {
        nota: 5,
        comentario: 'Produto excelente!',
        produtoId: testProduct.id
      };

      const review = await reviewService.create(testUser.id, reviewData);

      expect(review).toMatchObject({
        nota: 5,
        comentario: 'Produto excelente!',
        produtoId: testProduct.id,
        usuarioId: testUser.id
      });

      // Verificar se a avaliação foi criada no banco
      const createdReview = await prisma.avaliacao.findUnique({
        where: { id: review.id }
      });
      expect(createdReview).toBeTruthy();
    });

    it('deve lançar erro quando o usuário já avaliou o produto', async () => {
      const reviewData = {
        nota: 5,
        comentario: 'Produto excelente!',
        produtoId: testProduct.id
      };

      // Criar primeira avaliação
      await reviewService.create(testUser.id, reviewData);

      // Tentar criar segunda avaliação
      await expect(
        reviewService.create(testUser.id, reviewData)
      ).rejects.toThrow(
        new AppError(
          ERROR_CODES.DUPLICATE_ENTRY,
          HttpStatusCode.CONFLICT,
          { message: 'Você já avaliou este produto' }
        )
      );
    });

    it('deve lançar erro quando o produto não existe', async () => {
      const reviewData = {
        nota: 5,
        comentario: 'Produto excelente!',
        produtoId: 999999 // ID inexistente
      };

      await expect(
        reviewService.create(testUser.id, reviewData)
      ).rejects.toThrow(
        new AppError(
          ERROR_CODES.NOT_FOUND,
          HttpStatusCode.NOT_FOUND,
          { message: 'Produto não encontrado' }
        )
      );
    });
  });

  describe('findById', () => {
    it('deve encontrar uma avaliação por ID com sucesso', async () => {
      // Criar avaliação
      const reviewData = {
        nota: 5,
        comentario: 'Produto excelente!',
        produtoId: testProduct.id
      };
      const createdReview = await reviewService.create(testUser.id, reviewData);

      // Buscar avaliação
      const review = await reviewService.findById(createdReview.id);

      expect(review).toMatchObject({
        id: createdReview.id,
        nota: 5,
        comentario: 'Produto excelente!',
        produtoId: testProduct.id,
        usuarioId: testUser.id
      });
    });

    it('deve lançar erro quando a avaliação não existe', async () => {
      await expect(
        reviewService.findById(999999)
      ).rejects.toThrow(
        new AppError(
          ERROR_CODES.NOT_FOUND,
          HttpStatusCode.NOT_FOUND,
          { message: 'Avaliação não encontrada' }
        )
      );
    });
  });

  describe('update', () => {
    it('deve atualizar uma avaliação com sucesso', async () => {
      // Criar avaliação
      const reviewData = {
        nota: 5,
        comentario: 'Produto excelente!',
        produtoId: testProduct.id
      };
      const createdReview = await reviewService.create(testUser.id, reviewData);

      // Atualizar avaliação
      const updateData = {
        nota: 4,
        comentario: 'Produto muito bom!'
      };
      const updatedReview = await reviewService.update(createdReview.id, testUser.id, updateData);

      expect(updatedReview).toMatchObject({
        id: createdReview.id,
        nota: 4,
        comentario: 'Produto muito bom!',
        produtoId: testProduct.id,
        usuarioId: testUser.id
      });
    });

    it('deve lançar erro quando tenta atualizar avaliação de outro usuário', async () => {
      // Criar usuário e avaliação
      const otherUser = await createTestUser(prisma);
      const reviewData = {
        nota: 5,
        comentario: 'Produto excelente!',
        produtoId: testProduct.id
      };
      const createdReview = await reviewService.create(otherUser.id, reviewData);

      // Tentar atualizar com outro usuário
      const updateData = {
        nota: 4,
        comentario: 'Produto muito bom!'
      };
      await expect(
        reviewService.update(createdReview.id, testUser.id, updateData)
      ).rejects.toThrow(
        new AppError(
          ERROR_CODES.FORBIDDEN,
          HttpStatusCode.FORBIDDEN,
          { message: 'Você não tem permissão para atualizar esta avaliação' }
        )
      );
    });
  });

  describe('delete', () => {
    it('deve deletar uma avaliação com sucesso', async () => {
      // Criar avaliação
      const reviewData = {
        nota: 5,
        comentario: 'Produto excelente!',
        produtoId: testProduct.id
      };
      const createdReview = await reviewService.create(testUser.id, reviewData);

      // Deletar avaliação
      await reviewService.delete(createdReview.id, testUser.id);

      // Verificar se foi deletada
      const deletedReview = await prisma.avaliacao.findUnique({
        where: { id: createdReview.id }
      });
      expect(deletedReview).toBeNull();
    });

    it('deve lançar erro quando tenta deletar avaliação de outro usuário', async () => {
      // Criar usuário e avaliação
      const otherUser = await createTestUser(prisma);
      const reviewData = {
        nota: 5,
        comentario: 'Produto excelente!',
        produtoId: testProduct.id
      };
      const createdReview = await reviewService.create(otherUser.id, reviewData);

      // Tentar deletar com outro usuário
      await expect(
        reviewService.delete(createdReview.id, testUser.id)
      ).rejects.toThrow(
        new AppError(
          ERROR_CODES.FORBIDDEN,
          HttpStatusCode.FORBIDDEN,
          { message: 'Você não tem permissão para excluir esta avaliação' }
        )
      );
    });
  });

  describe('findByProductId', () => {
    it('deve encontrar avaliações de um produto com sucesso', async () => {
      // Criar múltiplas avaliações
      const reviews = await Promise.all([
        reviewService.create(testUser.id, {
          nota: 5,
          comentario: 'Excelente!',
          produtoId: testProduct.id
        }),
        reviewService.create(testUser.id, {
          nota: 4,
          comentario: 'Muito bom!',
          produtoId: testProduct.id
        })
      ]);

      // Buscar avaliações
      const result = await reviewService.findByProductId(testProduct.id, {
        page: 1,
        limit: 10
      });

      expect(result.avaliacoes).toHaveLength(2);
      expect(result.pagination).toMatchObject({
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1
      });
    });

    it('deve lançar erro quando o produto não existe', async () => {
      await expect(
        reviewService.findByProductId(999999, { page: 1, limit: 10 })
      ).rejects.toThrow(
        new AppError(
          ERROR_CODES.NOT_FOUND,
          HttpStatusCode.NOT_FOUND,
          { message: 'Produto não encontrado' }
        )
      );
    });

    it('deve retornar lista vazia quando não há avaliações', async () => {
      const result = await reviewService.findByProductId(testProduct.id, {
        page: 1,
        limit: 10
      });

      expect(result.avaliacoes).toHaveLength(0);
      expect(result.pagination).toMatchObject({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      });
    });
  });
}); 