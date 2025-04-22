import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProdutoService } from '../services/produtoService';
import prisma from '../lib/prisma';

vi.mock('../lib/prisma', () => {
  return {
    default: {
      produto: {
        create: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        findMany: vi.fn(),
      },
    },
  };
});

describe('ProdutoService', () => {
  const mockProduto = {
    id: 1,
    nome: 'Produto Teste',
    descricao: 'Descrição teste',
    preco: 99.99,
    estoque: 10,
    createdAt: new Date('2025-04-12T17:34:54.680Z'),
    updatedAt: new Date('2025-04-12T17:34:54.680Z'),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar um produto com sucesso', async () => {
    vi.mocked(prisma.produto.create).mockResolvedValue(mockProduto);

    const produto = await ProdutoService.criar({
      nome: 'Produto Teste',
      descricao: 'Descrição teste',
      preco: 99.99,
      estoque: 10,
    });

    expect(produto).toEqual(mockProduto);
    expect(prisma.produto.create).toHaveBeenCalledWith({
      data: {
        nome: 'Produto Teste',
        descricao: 'Descrição teste',
        preco: 99.99,
        estoque: 10,
      },
    });
  });

  it('deve atualizar um produto com sucesso', async () => {
    const produtoAtualizado = { ...mockProduto, nome: 'Produto Atualizado' };

    vi.mocked(prisma.produto.findUnique).mockResolvedValue(mockProduto);
    vi.mocked(prisma.produto.update).mockResolvedValue(produtoAtualizado);

    const resultado = await ProdutoService.atualizar(1, {
      nome: 'Produto Atualizado',
    });

    expect(resultado).toEqual(produtoAtualizado);
    expect(prisma.produto.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(prisma.produto.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { nome: 'Produto Atualizado' },
    });
  });

  it('deve excluir um produto com sucesso', async () => {
    vi.mocked(prisma.produto.findUnique).mockResolvedValue(mockProduto);
    vi.mocked(prisma.produto.delete).mockResolvedValue(mockProduto);

    const resultado = await ProdutoService.deletar(1);

    expect(resultado).toEqual(mockProduto);
    expect(prisma.produto.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(prisma.produto.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('deve buscar todos os produtos', async () => {
    vi.mocked(prisma.produto.findMany).mockResolvedValue([mockProduto]);

    const produtos = await ProdutoService.buscarTodos();

    expect(produtos).toEqual([mockProduto]);
    expect(prisma.produto.findMany).toHaveBeenCalled();
  });
});
