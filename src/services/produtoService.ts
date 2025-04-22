import prisma from '../lib/prisma';
import { BaseService } from './BaseService';

interface CriarProdutoDTO {
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
}

interface AtualizarProdutoDTO {
  nome?: string;
  descricao?: string;
  preco?: number;
  estoque?: number;
}

export class ProdutoService extends BaseService {
  static async criar(dados: CriarProdutoDTO) {
    await this.validarDadosProduto(dados);

    return await prisma.produto.create({
      data: dados,
    });
  }

  static async atualizar(id: number, dados: AtualizarProdutoDTO) {
    await this.validarDadosProduto(dados);

    const produto = await prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    return await prisma.produto.update({
      where: { id },
      data: dados,
    });
  }

  static async deletar(id: number) {
    const produto = await prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    return await prisma.produto.delete({
      where: { id },
    });
  }

  static async buscarTodos() {
    return await prisma.produto.findMany();
  }

  private static async validarDadosProduto(dados: Partial<CriarProdutoDTO>) {
    if (dados.nome && dados.nome.length > 100) {
      throw new Error('Nome deve ter no máximo 100 caracteres');
    }

    if (dados.preco !== undefined && dados.preco <= 0) {
      throw new Error('Preço deve ser maior que zero');
    }

    if (dados.estoque !== undefined && dados.estoque < 0) {
      throw new Error('Estoque não pode ser negativo');
    }

    if ('nome' in dados && !dados.nome) {
      throw new Error('Nome é obrigatório');
    }

    if ('preco' in dados && dados.preco === undefined) {
      throw new Error('Preço é obrigatório');
    }
  }
}
