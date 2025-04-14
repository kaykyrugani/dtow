import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';
import { IRepository } from './interfaces/IRepository';
import { PaginationParams } from '../types/shared';
import { AppError } from '../utils/AppError';
import { HttpStatusCode } from '../constants/httpCodes';
import { PrismaError, PrismaErrorMeta } from '../types/prisma';
import { ERROR_CODES } from '../constants/errorMessages';

@injectable()
export abstract class BaseRepository<T> implements IRepository<T> {
  protected abstract modelName: string;

  constructor(protected prisma: PrismaClient) {}

  protected handleError(error: unknown): never {
    if (error instanceof Error && 'code' in error) {
      const prismaError = error as PrismaError;
      const meta = prismaError.meta as PrismaErrorMeta;
      
      switch (prismaError.code) {
        case 'P2002':
          throw new AppError(
            ERROR_CODES.DUPLICATE_ENTRY,
            HttpStatusCode.CONFLICT,
            { field: Array.isArray(meta?.target) ? meta.target[0] : 'campo' }
          );
        case 'P2025':
          throw new AppError(
            ERROR_CODES.NOT_FOUND,
            HttpStatusCode.NOT_FOUND
          );
        default:
          throw new AppError(
            ERROR_CODES.INTERNAL_ERROR,
            HttpStatusCode.INTERNAL_SERVER_ERROR
          );
      }
    }

    throw new AppError(
      ERROR_CODES.INTERNAL_ERROR,
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }

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
      this.handleError(error);
    }
  }

  async findById<R = T>(id: string, options: R = {} as R): Promise<T | null> {
    try {
      const result = await (this.prisma[this.modelName as keyof PrismaClient] as any).findUnique({
        where: { id },
        ...options
      });

      return result;
    } catch (error) {
      this.handleError(error);
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
      this.handleError(error);
    }
  }

  async update<R = T>(id: string, data: Partial<T>, options: R = {} as R): Promise<T> {
    try {
      const result = await (this.prisma[this.modelName as keyof PrismaClient] as any).update({
        where: { id },
        data,
        ...options
      });

      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await (this.prisma[this.modelName as keyof PrismaClient] as any).delete({
        where: { id }
      });
    } catch (error) {
      this.handleError(error);
    }
  }
} 