import { Router } from 'express';

import { authRouter } from './auth';
import { productsRouter } from './products';

export const router = Router();

router.use('/auth', authRouter);
router.use('/products', productsRouter);
