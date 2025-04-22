import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaModels = Exclude<keyof PrismaClient, `$${string}`>;
export type PrismaModelName = PrismaModels;

export interface PaginationParams<T = any> {
  skip?: number;
  take?: number;
  where?: T;
  orderBy?: Prisma.SortOrder | Record<string, Prisma.SortOrder>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export interface QueryOptions<T = any> {
  include?: Record<string, boolean | object>;
  select?: Record<string, boolean | object>;
  where?: Partial<T>;
}

export enum PrismaErrorCodes {
  UNIQUE_CONSTRAINT = 'P2002',
  FOREIGN_KEY = 'P2003',
  NOT_FOUND = 'P2025',
}

export interface ServiceResponse<T> {
  data: T;
  status: number;
  message?: string;
}
