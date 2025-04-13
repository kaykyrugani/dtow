import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';
import { IRepository } from './interfaces/IRepository';
import { PaginationParams } from '../types/shared';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpCodes';
import { PrismaErrorHandler } from '../utils/prismaErrors';

@injectable()
export abstract class BaseRepository<T> implements IRepository<T> {
  protected abstract modelName: string;

  constructor(protected prisma: PrismaClient) {}

  async findAll<R = T>(params: PaginationParams<R> = {}): Promise<{ data: T[]; total: number }> {
    try {
      const [data, total] = await Promise.all([
        (this.prisma[this.modelName as keyof PrismaClient] as any).findMany({
          skip: params.skip,
          take: params.take,
          orderBy: params.orderBy,
          where: params.where
        }),
        (this.prisma[this.modelName as keyof PrismaClient] as any).count({
          where: params.where
        })
      ]);

      return { data, total };
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async findById<R = T>(id: number, options: R = {} as R): Promise<T | null> {
    try {
      const result = await (this.prisma[this.modelName as keyof PrismaClient] as any).findUnique({
        where: { id },
        ...options
      });

      return result;
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async create<R = T>(data: Partial<T>, options: R = {} as R): Promise<T> {
    try {
      const result = await (this.prisma[this.modelName as keyof PrismaClient] as any).create({
        data,
        ...options
      });

      return result;
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async update<R = T>(id: number, data: Partial<T>, options: R = {} as R): Promise<T> {
    try {
      const result = await (this.prisma[this.modelName as keyof PrismaClient] as any).update({
        where: { id },
        data,
        ...options
      });

      return result;
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await (this.prisma[this.modelName as keyof PrismaClient] as any).delete({
        where: { id }
      });
    } catch (error) {
      PrismaErrorHandler.handle(error);
    }
  }
} 