import { PrismaClient } from '@prisma/client';
import { PaginationOptions, PaginatedResult } from '../types/pagination';
import { AppError } from '../utils/AppError';

export class BaseService<T extends keyof PrismaClient> {
  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly model: T
  ) {}

  async paginar(options: PaginationOptions): Promise<PaginatedResult<any>> {
    const { 
      page = 1, 
      limit = 10, 
      where = {}, 
      orderBy = {} 
    } = options;

    const skip = (page - 1) * limit;

    try {
      const [items, total] = await Promise.all([
        this.prisma[this.model].findMany({ 
          skip, 
          take: limit, 
          where, 
          orderBy 
        }),
        this.prisma[this.model].count({ where })
      ]);

      return { 
        items, 
        total, 
        page, 
        limit, 
        totalPages: Math.ceil(total / limit) 
      };
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  protected handleDatabaseError(error: unknown): Error {
    if (error instanceof Error) {
      return new AppError(`Erro na operação do banco: ${error.message}`, 500);
    }
    return new AppError('Erro desconhecido na operação do banco', 500);
  }
} 