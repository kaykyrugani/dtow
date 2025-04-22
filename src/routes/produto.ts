import { Router } from 'express';
import { ProdutoController } from '../controllers/produtoController';
import { authMiddleware } from '../middlewares/auth';
import { adminMiddleware } from '../middlewares/admin';
import { validarSchema } from '../middlewares/validator';
import { produtoSchema } from '../schemas/produtoSchemas';

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Endpoints para gerenciamento de produtos
 */

const produtoRouter = Router();

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limite de itens por página
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Produto'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */
produtoRouter.get('/', ProdutoController.listar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Obtém um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
produtoRouter.get('/:id', ProdutoController.obterPorId);

// Rotas protegidas (admin)
produtoRouter.use(authMiddleware, adminMiddleware);

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       401:
 *         description: Não autorizado
 *       400:
 *         description: Dados inválidos
 */
produtoRouter.post('/', validarSchema(produtoSchema), ProdutoController.criar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 *       400:
 *         description: Dados inválidos
 */
produtoRouter.put('/:id', validarSchema(produtoSchema), ProdutoController.atualizar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 */
produtoRouter.delete('/:id', ProdutoController.excluir);

export { produtoRouter };

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do produto
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         descricao:
 *           type: string
 *           description: Descrição detalhada do produto
 *         preco:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *         estoque:
 *           type: integer
 *           description: Quantidade em estoque
 *         imagem:
 *           type: string
 *           description: URL da imagem do produto
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *     ProdutoInput:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - estoque
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         descricao:
 *           type: string
 *           description: Descrição detalhada do produto
 *         preco:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *         estoque:
 *           type: integer
 *           description: Quantidade em estoque
 *         imagem:
 *           type: string
 *           description: URL da imagem do produto
 */
