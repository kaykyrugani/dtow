import { injectable } from 'tsyringe';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDTO, UpdateProductDTO, ProductResponseDTO } from '../dtos/product.dto';
import { createProductSchema } from '../schemas/product.schema';
import { AppError } from '../../../shared/errors/AppError';
import { HttpStatusCode } from '../../../shared/errors/HttpStatusCode';
import { prisma } from '../../../config/database';
import { CacheService } from '../../../services/cache.service';
import { logger } from '../../../config/logger';
import { MetricsService } from '../../../services/metrics.service';

@injectable()
export class ProductService {
  private cacheService: CacheService;
  private readonly CACHE_PREFIX = 'product';
  private readonly CACHE_TTL = 3600; // 1 hora
  private readonly SERVICE_NAME = 'product';

  constructor(private productRepository: ProductRepository) {
    this.cacheService = CacheService.getInstance();
  }

  async create(data: CreateProductDTO): Promise<ProductResponseDTO> {
    const validatedData = createProductSchema.parse(data);
    const product = await this.productRepository.create(validatedData);
    await this.invalidateCache();
    logger.info('Produto criado com sucesso', { productId: product.id });
    return product;
  }

  async findById(id: number): Promise<ProductResponseDTO> {
    const start = Date.now();
    const cacheKey = this.cacheService.generateKey(`${this.CACHE_PREFIX}:${id}`);
    const cached = await this.cacheService.get<ProductResponseDTO>(cacheKey);

    if (cached) {
      MetricsService.incrementCacheHit(this.SERVICE_NAME, 'findById');
      logger.debug('Cache hit para produto', { productId: id });
      return cached;
    }

    MetricsService.incrementCacheMiss(this.SERVICE_NAME, 'findById');
    logger.debug('Cache miss para produto', { productId: id });
    const product = await this.productRepository.findById(id);

    if (!product) {
      logger.warn('Produto não encontrado', { productId: id });
      throw new AppError('Product not found', 404);
    }

    await this.cacheService.set(cacheKey, product, this.CACHE_TTL);
    MetricsService.observeCacheOperation(this.SERVICE_NAME, 'findById', Date.now() - start);
    logger.debug('Produto armazenado em cache', { productId: id });
    return product;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ produtos: ProductResponseDTO[]; total: number }> {
    const start = Date.now();
    const cacheKey = this.cacheService.generateKey(this.CACHE_PREFIX, { page, limit });
    const cached = await this.cacheService.get<{ produtos: ProductResponseDTO[]; total: number }>(
      cacheKey,
    );

    if (cached) {
      MetricsService.incrementCacheHit(this.SERVICE_NAME, 'findAll');
      logger.debug('Cache hit para lista de produtos', { page, limit });
      return cached;
    }

    MetricsService.incrementCacheMiss(this.SERVICE_NAME, 'findAll');
    logger.debug('Cache miss para lista de produtos', { page, limit });
    const { produtos, total } = await this.productRepository.findAll(page, limit);
    await this.cacheService.set(cacheKey, { produtos, total }, this.CACHE_TTL);
    MetricsService.observeCacheOperation(this.SERVICE_NAME, 'findAll', Date.now() - start);
    logger.debug('Lista de produtos armazenada em cache', { page, limit });
    return { produtos, total };
  }

  async update(id: number, data: Partial<CreateProductDTO>): Promise<ProductResponseDTO> {
    const updatedProduct = await this.productRepository.update(id, data);
    await this.invalidateCache();
    logger.info('Produto atualizado com sucesso', { productId: id });
    return updatedProduct;
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
    await this.invalidateCache();
    logger.info('Produto deletado com sucesso', { productId: id });
  }

  async findByCategory(
    categoria: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ produtos: ProductResponseDTO[]; total: number }> {
    const start = Date.now();
    const cacheKey = this.cacheService.generateKey(this.CACHE_PREFIX, { categoria, page, limit });
    const cached = await this.cacheService.get<{ produtos: ProductResponseDTO[]; total: number }>(
      cacheKey,
    );

    if (cached) {
      MetricsService.incrementCacheHit(this.SERVICE_NAME, 'findByCategory');
      logger.debug('Cache hit para produtos por categoria', { categoria, page, limit });
      return cached;
    }

    MetricsService.incrementCacheMiss(this.SERVICE_NAME, 'findByCategory');
    logger.debug('Cache miss para produtos por categoria', { categoria, page, limit });
    const { produtos, total } = await this.productRepository.findByCategory(categoria, page, limit);
    await this.cacheService.set(cacheKey, { produtos, total }, this.CACHE_TTL);
    MetricsService.observeCacheOperation(this.SERVICE_NAME, 'findByCategory', Date.now() - start);
    logger.debug('Produtos por categoria armazenados em cache', { categoria, page, limit });
    return { produtos, total };
  }

  async findBySubcategory(
    subcategoria: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ produtos: ProductResponseDTO[]; total: number }> {
    const start = Date.now();
    const cacheKey = this.cacheService.generateKey(this.CACHE_PREFIX, {
      subcategoria,
      page,
      limit,
    });
    const cached = await this.cacheService.get<{ produtos: ProductResponseDTO[]; total: number }>(
      cacheKey,
    );

    if (cached) {
      MetricsService.incrementCacheHit(this.SERVICE_NAME, 'findBySubcategory');
      logger.debug('Cache hit para produtos por subcategoria', { subcategoria, page, limit });
      return cached;
    }

    MetricsService.incrementCacheMiss(this.SERVICE_NAME, 'findBySubcategory');
    logger.debug('Cache miss para produtos por subcategoria', { subcategoria, page, limit });
    const { produtos, total } = await this.productRepository.findBySubcategory(
      subcategoria,
      page,
      limit,
    );
    await this.cacheService.set(cacheKey, { produtos, total }, this.CACHE_TTL);
    MetricsService.observeCacheOperation(
      this.SERVICE_NAME,
      'findBySubcategory',
      Date.now() - start,
    );
    logger.debug('Produtos por subcategoria armazenados em cache', { subcategoria, page, limit });
    return { produtos, total };
  }

  async searchProducts(
    query: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ produtos: ProductResponseDTO[]; total: number }> {
    const { produtos, total } = await this.productRepository.searchProducts(query, page, limit);
    return { produtos, total };
  }

  private async invalidateCache(): Promise<void> {
    await this.cacheService.clear();
    logger.debug('Cache invalidado para produtos');
  }
}
