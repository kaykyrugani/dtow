import { PaginationParams } from '../../types/shared';

export interface IRepository<T> {
  findAll<R = T>(params?: PaginationParams<R>): Promise<{ data: T[]; total: number }>;
  findById<R = T>(id: string, options?: R): Promise<T | null>;
  create<R = T>(data: Partial<T>, options?: R): Promise<T>;
  update<R = T>(id: string, data: Partial<T>, options?: R): Promise<T>;
  delete(id: string): Promise<void>;
} 