import { PrismaClient, Produto } from '@prisma/client';
import { injectable } from 'tsyringe';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';

@injectable()
export class ProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateProductDTO): Promise<Produto> {
    return this.prisma.produto.create({
      data,
    });
  }

  async findById(id: number): Promise<Produto | null> {
    return this.prisma.produto.findUnique({
      where: { id },
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ produtos: Produto[]; total: number }> {
    const skip = (page - 1) * limit;
    const [produtos, total] = await Promise.all([
      this.prisma.produto.findMany({
        skip,
        take: limit,
        orderBy: { criadoEm: 'desc' },
      }),
      this.prisma.produto.count(),
    ]);

    return { produtos, total };
  }

  async update(id: number, data: UpdateProductDTO): Promise<Produto> {
    return this.prisma.produto.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.produto.delete({
      where: { id },
    });
  }

  async findByCategory(
    categoria: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ produtos: Produto[]; total: number }> {
    const skip = (page - 1) * limit;
    const [produtos, total] = await Promise.all([
      this.prisma.produto.findMany({
        where: { categoria },
        skip,
        take: limit,
        orderBy: { criadoEm: 'desc' },
      }),
      this.prisma.produto.count({
        where: { categoria },
      }),
    ]);

    return { produtos, total };
  }

  async findBySubcategory(
    subcategoria: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ produtos: Produto[]; total: number }> {
    const skip = (page - 1) * limit;
    const [produtos, total] = await Promise.all([
      this.prisma.produto.findMany({
        where: { subcategoria },
        skip,
        take: limit,
        orderBy: { criadoEm: 'desc' },
      }),
      this.prisma.produto.count({
        where: { subcategoria },
      }),
    ]);

    return { produtos, total };
  }

  async searchProducts(
    query: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ produtos: Produto[]; total: number }> {
    const skip = (page - 1) * limit;
    const [produtos, total] = await Promise.all([
      this.prisma.produto.findMany({
        where: {
          OR: [
            { nome: { contains: query, mode: 'insensitive' } },
            { descricao: { contains: query, mode: 'insensitive' } },
            { marca: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        orderBy: { criadoEm: 'desc' },
      }),
      this.prisma.produto.count({
        where: {
          OR: [
            { nome: { contains: query, mode: 'insensitive' } },
            { descricao: { contains: query, mode: 'insensitive' } },
            { marca: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return { produtos, total };
  }
}
