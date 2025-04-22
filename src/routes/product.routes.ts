import { Router, Request, Response, NextFunction } from 'express';
import { ProductController } from '../modules/product/controllers/product.controller';
import { cacheMiddleware } from '../middlewares/cache.middleware';

const router = Router();
const productController = new ProductController();

// Rota com cache de 1 hora (3600 segundos)
router.get(
  '/products',
  cacheMiddleware(3600),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await productController.findAll(req, res);
    } catch (error) {
      next(error);
    }
  },
);

// Rota sem cache
router.get('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productController.findById(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
