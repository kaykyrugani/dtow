import { describe, it, expect, beforeEach, vi } from 'vitest';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { ProductService } from '../../modules/product/services/product.service';
import { AppError } from '../../shared/errors/AppError';
import { HttpStatusCode } from '../../shared/errors/HttpStatusCode';
import { mockPrisma } from '../mocks/prisma.mock';
import { CreateProductDTO, ProductResponseDTO } from '../../modules/product/dtos/product.dto';

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrisma),
}));

describe('Product Service Tests', () => {
  let productService: ProductService;
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = container.resolve(PrismaClient);
    productService = container.resolve(ProductService);
  });

  describe('create', () => {
    it('deve criar um produto com sucesso', async () => {
      const productData: CreateProductDTO = {
        nome: 'Produto Teste',
        descricao: 'Descrição do produto teste',
        preco: 100.0,
        categoria: 'ELETRONICOS',
        subcategoria: 'SMARTPHONES',
        marca: 'Marca Teste',
        estoque: 10,
        imagem: 'https://exemplo.com/imagem.jpg',
        imagens: '[]',
        tamanhos: '[]',
      };

      const mockResponse: ProductResponseDTO = {
        id: 1,
        ...productData,
        desconto: null,
        ativo: true,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };

      mockPrisma.produto.create.mockResolvedValue(mockResponse);

      const result = await productService.create(productData);

      expect(result).toBeDefined();
      expect(result.nome).toBe(productData.nome);
      expect(result.preco).toBe(productData.preco);
      expect(result.ativo).toBe(true);
    });

    it('deve lançar erro ao criar produto com dados inválidos', async () => {
      const invalidProductData = {
        nome: '',
        descricao: '',
        preco: -100,
        categoria: 'INVALIDA',
        subcategoria: '',
        marca: '',
        estoque: -1,
        imagem: 'url-invalida',
        imagens: '[]',
        tamanhos: '[]',
      };

      await expect(productService.create(invalidProductData)).rejects.toThrow(AppError);
    });
  });

  describe('findById', () => {
    it('deve encontrar um produto por ID', async () => {
      const mockProduct: ProductResponseDTO = {
        id: 1,
        nome: 'Produto Teste',
        descricao: 'Descrição do produto teste',
        preco: 100.0,
        desconto: null,
        categoria: 'ELETRONICOS',
        subcategoria: 'SMARTPHONES',
        marca: 'Marca Teste',
        estoque: 10,
        imagem: 'https://exemplo.com/imagem.jpg',
        imagens: '[]',
        tamanhos: '[]',
        ativo: true,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };

      mockPrisma.produto.findUnique.mockResolvedValue(mockProduct);

      const result = await productService.findById(1);

      expect(result).toBeDefined();
      expect(result.id).toBe(mockProduct.id);
      expect(result.nome).toBe(mockProduct.nome);
    });

    it('deve lançar erro quando produto não existe', async () => {
      mockPrisma.produto.findUnique.mockResolvedValue(null);

      await expect(productService.findById(999)).rejects.toThrow(AppError);
    });
  });

  describe('update', () => {
    it('deve atualizar um produto com sucesso', async () => {
      const productId = 1;
      const updateData = {
        nome: 'Produto Atualizado',
        preco: 150.0,
      };

      const mockProduct = {
        id: productId,
        nome: 'Produto Teste',
        descricao: 'Descrição do produto teste',
        preco: 100.0,
        desconto: null,
        categoria: 'ELETRONICOS',
        subcategoria: 'SMARTPHONES',
        marca: 'Marca Teste',
        estoque: 10,
        imagem: 'https://exemplo.com/imagem.jpg',
        imagens: '[]',
        tamanhos: '[]',
        ativo: true,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };

      mockPrisma.produto.findUnique.mockResolvedValue(mockProduct);
      mockPrisma.produto.update.mockResolvedValue({
        ...mockProduct,
        ...updateData,
      });

      const result = await productService.update(productId, updateData);

      expect(result).toBeDefined();
      expect(result.nome).toBe(updateData.nome);
      expect(result.preco).toBe(updateData.preco);
    });

    it('deve lançar erro ao atualizar produto inexistente', async () => {
      mockPrisma.produto.findUnique.mockResolvedValue(null);

      await expect(productService.update(999, { nome: 'Teste' })).rejects.toThrow(
        new AppError(ERROR_CODES.NOT_FOUND, HttpStatusCode.NOT_FOUND, {
          message: 'Produto não encontrado',
        }),
      );
    });

    it('deve lançar erro ao atualizar com dados inválidos', async () => {
      const mockProduct = {
        id: 1,
        nome: 'Produto Teste',
        preco: 100.0,
        ativo: true,
      };

      mockPrisma.produto.findUnique.mockResolvedValue(mockProduct);

      await expect(productService.update(1, { preco: -100 })).rejects.toThrow(
        new AppError(ERROR_CODES.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST, {
          message: 'Dados do produto inválidos',
        }),
      );
    });
  });

  describe('delete', () => {
    it('deve deletar um produto com sucesso', async () => {
      const mockProduct = {
        id: 1,
        nome: 'Produto Teste',
        ativo: true,
      };

      mockPrisma.produto.findUnique.mockResolvedValue(mockProduct);
      mockPrisma.produto.delete.mockResolvedValue(mockProduct);

      await expect(productService.delete(1)).resolves.not.toThrow();
    });

    it('deve lançar erro ao deletar produto inexistente', async () => {
      mockPrisma.produto.findUnique.mockResolvedValue(null);

      await expect(productService.delete(999)).rejects.toThrow(
        new AppError(ERROR_CODES.NOT_FOUND, HttpStatusCode.NOT_FOUND, {
          message: 'Produto não encontrado',
        }),
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar lista de produtos paginada', async () => {
      const mockProducts: ProductResponseDTO[] = [
        {
          id: 1,
          nome: 'Produto 1',
          descricao: 'Descrição 1',
          preco: 100.0,
          desconto: null,
          categoria: 'ELETRONICOS',
          subcategoria: 'SMARTPHONES',
          marca: 'Marca 1',
          estoque: 10,
          imagem: 'https://exemplo.com/imagem1.jpg',
          imagens: '[]',
          tamanhos: '[]',
          ativo: true,
          criadoEm: new Date(),
          atualizadoEm: new Date(),
        },
        {
          id: 2,
          nome: 'Produto 2',
          descricao: 'Descrição 2',
          preco: 200.0,
          desconto: null,
          categoria: 'ELETRONICOS',
          subcategoria: 'SMARTPHONES',
          marca: 'Marca 2',
          estoque: 5,
          imagem: 'https://exemplo.com/imagem2.jpg',
          imagens: '[]',
          tamanhos: '[]',
          ativo: true,
          criadoEm: new Date(),
          atualizadoEm: new Date(),
        },
      ];

      mockPrisma.produto.findMany.mockResolvedValue(mockProducts);
      mockPrisma.produto.count.mockResolvedValue(2);

      const result = await productService.findAll(1, 10);

      expect(result.produtos).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it('deve filtrar produtos por categoria', async () => {
      const mockProducts = [
        {
          id: 1,
          nome: 'Smartphone',
          categoria: 'ELETRONICOS',
          subcategoria: 'SMARTPHONES',
          preco: 1000.0,
          ativo: true,
        },
      ];

      mockPrisma.produto.findMany.mockResolvedValue(mockProducts);
      mockPrisma.produto.count.mockResolvedValue(1);

      const result = await productService.findByCategory('ELETRONICOS', 1, 10);

      expect(result.produtos).toHaveLength(1);
      expect(result.produtos[0].categoria).toBe('ELETRONICOS');
    });
  });

  describe('search', () => {
    it('deve buscar produtos por termo de pesquisa', async () => {
      const mockProducts: ProductResponseDTO[] = [
        {
          id: 1,
          nome: 'iPhone 12',
          descricao: 'Smartphone Apple',
          preco: 5000.0,
          desconto: null,
          categoria: 'ELETRONICOS',
          subcategoria: 'SMARTPHONES',
          marca: 'Apple',
          estoque: 10,
          imagem: 'https://exemplo.com/iphone12.jpg',
          imagens: '[]',
          tamanhos: '[]',
          ativo: true,
          criadoEm: new Date(),
          atualizadoEm: new Date(),
        },
      ];

      mockPrisma.produto.findMany.mockResolvedValue(mockProducts);
      mockPrisma.produto.count.mockResolvedValue(1);

      const result = await productService.searchProducts('iphone', 1, 10);

      expect(result.produtos).toHaveLength(1);
      expect(result.produtos[0].nome).toContain('iPhone');
    });

    it('deve retornar lista vazia quando nenhum produto encontrado', async () => {
      mockPrisma.produto.findMany.mockResolvedValue([]);
      mockPrisma.produto.count.mockResolvedValue(0);

      const result = await productService.searchProducts('produto inexistente', 1, 10);

      expect(result.produtos).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });
});
