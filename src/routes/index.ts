import { Router } from 'express';
import { authRouter } from './auth';
import { usuarioRouter } from './usuario';
import { produtoRouter } from './produto';
import { pedidoRouter } from './pedido';
import reviewRouter from '../modules/review/routes/review.routes';
import { paymentRouter } from './payment.routes';
import { addressRouter } from '../modules/address/routes/address.routes';
import productRoutes from '../modules/product/routes/product.routes';
import reviewRoutes from '../modules/review/routes/review.routes';
import authRoutes from '../modules/auth/routes/auth.routes';
import userRoutes from '../modules/user/routes/user.routes';
import orderRoutes from '../modules/order/routes/order.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/usuario', usuarioRouter);
router.use('/produtos', produtoRouter);
router.use('/pedidos', pedidoRouter);
router.use('/avaliacoes', reviewRouter);
router.use('/payments', paymentRouter);
router.use('/enderecos', addressRouter);
router.use('/products', productRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

export { router };
