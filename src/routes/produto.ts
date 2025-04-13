import { Router } from 'express'
import { ProdutoController } from '../controllers/produtoController'
import { authMiddleware } from '../middlewares/auth'
import { adminMiddleware } from '../middlewares/admin'
import { validarSchema } from '../middlewares/validator'
import { produtoSchema } from '../schemas/produtoSchemas'

const produtoRouter = Router()

// Rotas públicas
produtoRouter.get('/', ProdutoController.listar)
produtoRouter.get('/:id', ProdutoController.obterPorId)

// Rotas protegidas (admin)
produtoRouter.use(authMiddleware, adminMiddleware)
produtoRouter.post('/', validarSchema(produtoSchema), ProdutoController.criar)
produtoRouter.put('/:id', validarSchema(produtoSchema), ProdutoController.atualizar)
produtoRouter.delete('/:id', ProdutoController.excluir)

export { produtoRouter } 