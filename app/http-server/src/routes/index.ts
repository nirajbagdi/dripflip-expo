import { Router } from 'express';
import { authRouter } from './auth';
import { productsRouter } from './products';
import { cartRouter } from './cart';

export const router = Router();

router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/cart', cartRouter);
