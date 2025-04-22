import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';
import { AppError } from '../../../shared/errors/AppError';
import { HttpStatusCode } from '../../../shared/errors/HttpStatusCode';

vi.mock('../repositories/product.repository');

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;

  const mockProduct = {
    id: 1,
    nome: 'Produto Teste',
    descricao: 'Descrição do produto teste',
    preco: 99.9,
    desconto: null,
    marca: 'Marca Teste',
    categoria: 'Categoria Teste',
    subcategoria: 'Subcategoria Teste',
    imagem: 'imagem.jpg',
    imagens: 'imagem1.jpg,imagem2.jpg',
    tamanhos: 'P,M,G',
    estoque: 10,
    ativo: true,
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  };

  beforeEach(() => {
    productRepository = new ProductRepository();
    productService = new ProductService(productRepository);
  });

  describe('create', () => {
    it('deve criar um produto com sucesso', async () => {
      vi.spyOn(productRepository, 'create').mockResolvedValue(mockProduct);

      const result = await productService.create({
        nome: 'Produto Teste',
        descricao: 'Descrição do produto teste',
        preco: 99.9,
        marca: 'Marca Teste',
        categoria: 'Categoria Teste',
        subcategoria: 'Subcategoria Teste',
        imagem: 'https://exemplo.com/imagem.jpg',
        imagens: 'imagem1.jpg,imagem2.jpg',
        tamanhos: 'P,M,G',
        estoque: 10,
      });

      expect(result).toEqual(mockProduct);
    });

    it('deve lançar erro quando dados são inválidos', async () => {
      await expect(
        productService.create({
          nome: 'P', // Nome muito curto
          descricao: 'Curta', // Descrição muito curta
          preco: -10, // Preço negativo
          marca: 'M',
          categoria: 'C',
          subcategoria: 'S',
          imagem: 'invalida', // URL inválida
          imagens: '',
          tamanhos: '',
          estoque: -1, // Estoque negativo
        } as any),
      ).rejects.toThrow();
    });
  });

  describe('findById', () => {
    it('deve encontrar um produto por ID', async () => {
      vi.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);

      const result = await productService.findById(1);
      expect(result).toEqual(mockProduct);
    });

    it('deve lançar erro quando produto não existe', async () => {
      vi.spyOn(productRepository, 'findById').mockResolvedValue(null);

      await expect(productService.findById(999)).rejects.toThrow(
        new AppError('Produto não encontrado', HttpStatusCode.NOT_FOUND),
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar lista paginada de produtos', async () => {
      vi.spyOn(productRepository, 'findAll').mockResolvedValue({
        produtos: [mockProduct],
        total: 1,
      });

      const result = await productService.findAll(1, 10);
      expect(result.produtos).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('update', () => {
    it('deve atualizar um produto com sucesso', async () => {
      vi.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
      vi.spyOn(productRepository, 'update').mockResolvedValue({
        ...mockProduct,
        nome: 'Produto Atualizado',
      });

      const result = await productService.update(1, { nome: 'Produto Atualizado' });
      expect(result.nome).toBe('Produto Atualizado');
    });

    it('deve lançar erro ao atualizar produto inexistente', async () => {
      vi.spyOn(productRepository, 'findById').mockResolvedValue(null);

      await expect(productService.update(999, { nome: 'Teste' })).rejects.toThrow(
        new AppError('Produto não encontrado', HttpStatusCode.NOT_FOUND),
      );
    });
  });

  describe('delete', () => {
    it('deve deletar um produto com sucesso', async () => {
      vi.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
      vi.spyOn(productRepository, 'delete').mockResolvedValue();

      await expect(productService.delete(1)).resolves.not.toThrow();
    });

    it('deve lançar erro ao deletar produto inexistente', async () => {
      vi.spyOn(productRepository, 'findById').mockResolvedValue(null);

      await expect(productService.delete(999)).rejects.toThrow(
        new AppError('Produto não encontrado', HttpStatusCode.NOT_FOUND),
      );
    });
  });

  describe('findByCategory', () => {
    it('deve retornar produtos por categoria', async () => {
      vi.spyOn(productRepository, 'findByCategory').mockResolvedValue({
        produtos: [mockProduct],
        total: 1,
      });

      const result = await productService.findByCategory('Categoria Teste');
      expect(result.produtos).toHaveLength(1);
      expect(result.produtos[0].categoria).toBe('Categoria Teste');
    });
  });

  describe('findBySubcategory', () => {
    it('deve retornar produtos por subcategoria', async () => {
      vi.spyOn(productRepository, 'findBySubcategory').mockResolvedValue({
        produtos: [mockProduct],
        total: 1,
      });

      const result = await productService.findBySubcategory('Subcategoria Teste');
      expect(result.produtos).toHaveLength(1);
      expect(result.produtos[0].subcategoria).toBe('Subcategoria Teste');
    });
  });

  describe('searchProducts', () => {
    it('deve retornar produtos por termo de busca', async () => {
      vi.spyOn(productRepository, 'searchProducts').mockResolvedValue({
        produtos: [mockProduct],
        total: 1,
      });

      const result = await productService.searchProducts('Teste');
      expect(result.produtos).toHaveLength(1);
      expect(result.produtos[0].nome).toContain('Teste');
    });
  });
});
