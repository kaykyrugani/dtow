import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';
import { PaginationParams, PaginatedResult, QueryOptions } from '../types/pagination';

export class BaseService<T extends keyof PrismaClient> {
  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly model: T
  ) {}

  async findAll<R>(params: PaginationParams<R> = {}): Promise<PaginatedResult<R>> {
    return this.paginateInternal(params);
  }

  async findById<R>(id: number, options: QueryOptions<R> = {}): Promise<R | null> {
    return this.findByIdInternal(id, options);
  }

  async create<R>(data: Record<string, any>, options: QueryOptions<R> = {}): Promise<R> {
    return this.createInternal(data, options);
  }

  async update<R>(id: number, data: Record<string, any>, options: QueryOptions<R> = {}): Promise<R> {
    return this.updateInternal(id, data, options);
  }

  async delete(id: number): Promise<void> {
    return this.deleteInternal(id);
  }

  protected async paginateInternal<R>(
    params: PaginationParams<R> = {}
  ): Promise<PaginatedResult<R>> {
    const { 
      page = 1, 
      limit = 10, 
      where = {}, 
      orderBy = {} 
    } = params;

    const skip = (page - 1) * limit;

    try {
      const [items, total] = await Promise.all([
        (this.prisma[this.model] as any).findMany({ 
          skip, 
          take: limit, 
          where, 
          orderBy 
        }),
        (this.prisma[this.model] as any).count({ where })
      ]);

      const totalPages = Math.ceil(total / limit);

      return { 
        items, 
        total, 
        page, 
        limit, 
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async findOneInternal<R>(
    where: Record<string, any>,
    options: QueryOptions<R> = {}
  ): Promise<R | null> {
    try {
      return await (this.prisma[this.model] as any).findFirst({
        where,
        ...options
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async findByIdInternal<R>(
    id: number,
    options: QueryOptions<R> = {}
  ): Promise<R | null> {
    try {
      return await (this.prisma[this.model] as any).findUnique({
        where: { id },
        ...options
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async createInternal<R>(
    data: Record<string, any>,
    options: QueryOptions<R> = {}
  ): Promise<R> {
    try {
      return await (this.prisma[this.model] as any).create({
        data,
        ...options
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async updateInternal<R>(
    id: number,
    data: Record<string, any>,
    options: QueryOptions<R> = {}
  ): Promise<R> {
    try {
      return await (this.prisma[this.model] as any).update({
        where: { id },
        data,
        ...options
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async deleteInternal(id: number): Promise<void> {
    try {
      await (this.prisma[this.model] as any).delete({
        where: { id }
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected handleError(error: unknown): never {
    if (error instanceof AppError) {
      throw error;
    }

    // Prisma error handling
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; meta?: { target?: string[] } };
      
      switch (prismaError.code) {
        case 'P2002':
          throw new AppError(
            'Registro duplicado encontrado' + 
            (prismaError.meta?.target ? `: ${prismaError.meta.target.join(', ')}` : ''),
            409
          );
        case 'P2025':
          throw new AppError('Registro não encontrado', 404);
        case 'P2003':
          throw new AppError('Violação de restrição de chave estrangeira', 400);
        case 'P2014':
          throw new AppError('Violação de restrição de invalidação', 400);
        default:
          console.error('Prisma Error:', error);
          throw new AppError('Erro interno do servidor', 500);
      }
    }

    if (error instanceof Error) {
      console.error('Error:', error);
      throw new AppError(error.message, 500);
    }

    console.error('Unexpected Error:', error);
    throw new AppError('Erro interno do servidor', 500);
  }
} 