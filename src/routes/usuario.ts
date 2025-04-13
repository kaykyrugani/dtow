import { Router } from 'express'
import { UsuarioController } from '../controllers/usuarioController'
import { authMiddleware } from '../middlewares/auth'
import { validarSchema } from '../middlewares/validator'
import { atualizarPerfilSchema, enderecoSchema } from '../schemas/usuarioSchemas'

const usuarioRouter = Router()

usuarioRouter.use(authMiddleware)

usuarioRouter.get('/perfil', UsuarioController.obterPerfil)
usuarioRouter.put('/perfil', validarSchema(atualizarPerfilSchema), UsuarioController.atualizarPerfil)
usuarioRouter.post('/endereco', validarSchema(enderecoSchema), UsuarioController.adicionarEndereco)
usuarioRouter.get('/pedidos', UsuarioController.listarPedidos)

export { usuarioRouter } 