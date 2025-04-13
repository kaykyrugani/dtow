import { Prisma, PrismaClient } from '@prisma/client';

export interface PaginationParams<T = any> {
  page?: number;
  limit?: number;
  orderBy?: keyof T;
  order?: 'asc' | 'desc';
  where?: Partial<T>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryOptions<T = any> {
  include?: Record<string, boolean | object>;
  select?: Record<string, boolean | object>;
  where?: Partial<T>;
}

export type PrismaModels = Exclude<keyof PrismaClient, `$${string}`>;
export type PrismaModelName = PrismaModels; 