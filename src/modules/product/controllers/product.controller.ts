import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProductService } from '../services/product.service';
import { HttpStatusCode } from '../../../shared/errors/HttpStatusCode';

export class ProductController {
  async create(req: Request, res: Response): Promise<Response> {
    const productService = container.resolve(ProductService);
    const product = await productService.create(req.body);
    return res.status(HttpStatusCode.CREATED).json(product);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const productService = container.resolve(ProductService);
    const product = await productService.findById(Number(id));
    return res.status(HttpStatusCode.OK).json(product);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10 } = req.query;
    const productService = container.resolve(ProductService);
    const products = await productService.findAll(Number(page), Number(limit));
    return res.status(HttpStatusCode.OK).json(products);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const productService = container.resolve(ProductService);
    const product = await productService.update(Number(id), req.body);
    return res.status(HttpStatusCode.OK).json(product);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const productService = container.resolve(ProductService);
    await productService.delete(Number(id));
    return res.status(HttpStatusCode.NO_CONTENT).send();
  }

  async findByCategory(req: Request, res: Response): Promise<Response> {
    const { categoria } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const productService = container.resolve(ProductService);
    const products = await productService.findByCategory(categoria, Number(page), Number(limit));
    return res.status(HttpStatusCode.OK).json(products);
  }

  async findBySubcategory(req: Request, res: Response): Promise<Response> {
    const { subcategoria } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const productService = container.resolve(ProductService);
    const products = await productService.findBySubcategory(subcategoria, Number(page), Number(limit));
    return res.status(HttpStatusCode.OK).json(products);
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { q } = req.query;
    const { page = 1, limit = 10 } = req.query;
    const productService = container.resolve(ProductService);
    const products = await productService.searchProducts(String(q), Number(page), Number(limit));
    return res.status(HttpStatusCode.OK).json(products);
  }
} 