import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { ProductController } from '../controllers/product.controller';
import { validateSchema } from '../../../middlewares/validateSchema';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema';

const router = Router();
const productController = new ProductController();

// Rotas públicas
router.get('/', (req, res) => productController.findAll(req, res));
router.get('/search', (req, res) => productController.search(req, res));
router.get('/categoria/:categoria', (req, res) => productController.findByCategory(req, res));
router.get('/subcategoria/:subcategoria', (req, res) => productController.findBySubcategory(req, res));
router.get('/:id', (req, res) => productController.findById(req, res));

// Middleware de autenticação
router.use(authMiddleware());

// Rotas protegidas
router.post('/', validateSchema(createProductSchema), (req, res) => productController.create(req, res));
router.put('/:id', validateSchema(updateProductSchema), (req, res) => productController.update(req, res));
router.delete('/:id', (req, res) => productController.delete(req, res));

export default router; 