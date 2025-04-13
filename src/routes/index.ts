import { Router } from 'express'
import { authRouter } from './auth'
import { usuarioRouter } from './usuario'
import { produtoRouter } from './produto'
import { pedidoRouter } from './pedido'

const router = Router()

router.use('/auth', authRouter)
router.use('/usuario', usuarioRouter)
router.use('/produtos', produtoRouter)
router.use('/pedidos', pedidoRouter)

export { router } 