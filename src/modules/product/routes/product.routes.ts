import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { ProductController } from '../controllers/product.controller';
import { validateSchema } from '../../../middlewares/validateSchema';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema';
import { cacheMiddleware } from '../../../middlewares/cache.middleware';

const router = Router();
const productController = new ProductController();

// Rotas públicas com cache
router.get('/', cacheMiddleware(3600), (req, res) => productController.findAll(req, res));
router.get('/search', cacheMiddleware(1800), (req, res) => productController.search(req, res));
router.get('/categoria/:categoria', cacheMiddleware(3600), (req, res) =>
  productController.findByCategory(req, res),
);
router.get('/subcategoria/:subcategoria', cacheMiddleware(3600), (req, res) =>
  productController.findBySubcategory(req, res),
);
router.get('/:id', cacheMiddleware(3600), (req, res) => productController.findById(req, res));

// Rotas protegidas (sem cache)
router.post('/', authMiddleware, validateSchema(createProductSchema), (req, res) =>
  productController.create(req, res),
);
router.put('/:id', authMiddleware, validateSchema(updateProductSchema), (req, res) =>
  productController.update(req, res),
);
router.delete('/:id', authMiddleware, (req, res) => productController.delete(req, res));

export default router;
