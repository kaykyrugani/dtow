import { PrismaClient } from '@prisma/client';
import { PaginationParams, PaginatedResult, QueryOptions, PrismaModels } from '../types/shared';
import { AppError } from '../utils/AppError';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, DEFAULT_ORDER } from '../config/constants';
import { LoggerService } from '../utils/LoggerService';
import { PrismaErrorCodes } from '../utils/errorConstants';

export class BaseService<T extends PrismaModels> {
  protected prisma: PrismaClient;
  protected model: T;

  constructor(prisma: PrismaClient, model: T) {
    this.prisma = prisma;
    this.model = model;
  }

  // Métodos Públicos
  async findAll<R = any>(params: PaginationParams<R> = {}): Promise<PaginatedResult<R>> {
    try {
      return await this._paginateInternal(params);
    } catch (error) {
      this._handleError(error);
      throw error;
    }
  }

  async findById<R = any>(id: number, options: QueryOptions<R> = {}): Promise<R | null> {
    try {
      return await this._findByIdInternal(id, options);
    } catch (error) {
      this._handleError(error);
      throw error;
    }
  }

  async create<R = any>(data: Record<string, any>, options: QueryOptions<R> = {}): Promise<R> {
    try {
      return await this._createInternal(data, options);
    } catch (error) {
      this._handleError(error);
      throw error;
    }
  }

  async update<R = any>(
    id: number,
    data: Record<string, any>,
    options: QueryOptions<R> = {},
  ): Promise<R> {
    try {
      return await this._updateInternal(id, data, options);
    } catch (error) {
      this._handleError(error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this._deleteInternal(id);
    } catch (error) {
      this._handleError(error);
      throw error;
    }
  }

  // Métodos Internos Protegidos
  protected async _paginateInternal<R>(params: PaginationParams<R>): Promise<PaginatedResult<R>> {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(params.limit || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
    const skip = (page - 1) * limit;
    const order = params.order || DEFAULT_ORDER;

    const [total, data] = await Promise.all([
      (this.prisma[this.model] as any).count({ where: params.where }),
      (this.prisma[this.model] as any).findMany({
        skip,
        take: limit,
        where: params.where,
        orderBy: params.orderBy ? { [String(params.orderBy)]: order } : undefined,
      }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  protected async _findByIdInternal<R>(id: number, options: QueryOptions<R>): Promise<R | null> {
    return (this.prisma[this.model] as any).findUnique({
      where: { id },
      ...options,
    });
  }

  protected async _createInternal<R>(
    data: Record<string, any>,
    options: QueryOptions<R>,
  ): Promise<R> {
    return (this.prisma[this.model] as any).create({
      data,
      ...options,
    });
  }

  protected async _updateInternal<R>(
    id: number,
    data: Record<string, any>,
    options: QueryOptions<R>,
  ): Promise<R> {
    const exists = await this._findByIdInternal(id, {});
    if (!exists) {
      throw AppError.notFound(`${String(this.model)} não encontrado`);
    }

    return (this.prisma[this.model] as any).update({
      where: { id },
      data,
      ...options,
    });
  }

  protected async _deleteInternal(id: number): Promise<void> {
    const exists = await this._findByIdInternal(id, {});
    if (!exists) {
      throw AppError.notFound(`${String(this.model)} não encontrado`);
    }

    await (this.prisma[this.model] as any).delete({
      where: { id },
    });
  }

  protected _handleError(error: any): never {
    LoggerService.error(`Erro no ${String(this.model)}Service`, error);

    if (error instanceof AppError) {
      throw error;
    }

    if (error && typeof error === 'object' && 'code' in error) {
      switch (error.code) {
        case PrismaErrorCodes.UNIQUE_CONSTRAINT:
          throw AppError.invalidData('Registro duplicado');
        case PrismaErrorCodes.FOREIGN_KEY_CONSTRAINT:
          throw AppError.invalidData('Referência inválida');
        case PrismaErrorCodes.NOT_FOUND:
          throw AppError.notFound('Registro não encontrado');
        case PrismaErrorCodes.REQUIRED_FIELD:
          throw AppError.invalidData('Campos obrigatórios não preenchidos');
      }
    }

    throw AppError.internal('Erro interno do servidor');
  }
}
