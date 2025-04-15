import { injectable } from 'tsyringe';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDTO, UpdateProductDTO, ProductResponseDTO } from '../dtos/product.dto';
import { createProductSchema } from '../schemas/product.schema';
import { AppError } from '../../../shared/errors/AppError';
import { HttpStatusCode } from '../../../shared/errors/HttpStatusCode';

@injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(data: CreateProductDTO): Promise<ProductResponseDTO> {
    const validatedData = createProductSchema.parse(data);
    
    const product = await this.productRepository.create(validatedData);
    return product;
  }

  async findById(id: number): Promise<ProductResponseDTO> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new AppError('Produto não encontrado', HttpStatusCode.NOT_FOUND);
    }

    return product;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ produtos: ProductResponseDTO[]; total: number }> {
    const { produtos, total } = await this.productRepository.findAll(page, limit);
    return { produtos, total };
  }

  async update(id: number, data: UpdateProductDTO): Promise<ProductResponseDTO> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new AppError('Produto não encontrado', HttpStatusCode.NOT_FOUND);
    }

    const updatedProduct = await this.productRepository.update(id, data);
    return updatedProduct;
  }

  async delete(id: number): Promise<void> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new AppError('Produto não encontrado', HttpStatusCode.NOT_FOUND);
    }

    await this.productRepository.delete(id);
  }

  async findByCategory(categoria: string, page: number = 1, limit: number = 10): Promise<{ produtos: ProductResponseDTO[]; total: number }> {
    const { produtos, total } = await this.productRepository.findByCategory(categoria, page, limit);
    return { produtos, total };
  }

  async findBySubcategory(subcategoria: string, page: number = 1, limit: number = 10): Promise<{ produtos: ProductResponseDTO[]; total: number }> {
    const { produtos, total } = await this.productRepository.findBySubcategory(subcategoria, page, limit);
    return { produtos, total };
  }

  async searchProducts(query: string, page: number = 1, limit: number = 10): Promise<{ produtos: ProductResponseDTO[]; total: number }> {
    const { produtos, total } = await this.productRepository.searchProducts(query, page, limit);
    return { produtos, total };
  }
} 