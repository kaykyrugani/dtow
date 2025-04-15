import { Router } from 'express'
import { authRouter } from './auth'
import { usuarioRouter } from './usuario'
import { produtoRouter } from './produto'
import { pedidoRouter } from './pedido'
import reviewRouter from '../modules/review/routes/review.routes'
import { paymentRouter } from './payment.routes'
import { addressRouter } from '../modules/address/routes/address.routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/usuario', usuarioRouter)
router.use('/produtos', produtoRouter)
router.use('/pedidos', pedidoRouter)
router.use('/avaliacoes', reviewRouter)
router.use('/payments', paymentRouter)
router.use('/enderecos', addressRouter)

export { router } 