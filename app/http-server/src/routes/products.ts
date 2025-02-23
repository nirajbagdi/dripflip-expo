import { Router } from 'express';
import dbClient from '@repo/db/client';

import adminMiddleware from '../middleware/admin';
import userMiddleware from '../middleware/user';

import { productSchemas } from '../schemas';

export const productsRouter = Router();

productsRouter.post('/', adminMiddleware, async (req, res) => {
    const parsed = productSchemas.create.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ message: 'Validation failed' });
        return;
    }

    try {
        const product = await dbClient.product.create({
            data: {
                ...req.body,
            },
        });

        res.status(201).json({ productId: product.id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product' });
    }
});

productsRouter.get('/', userMiddleware, async (req, res) => {
    try {
        const products = await dbClient.product.findMany();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

productsRouter.get('/:id', userMiddleware, async (req, res) => {
    try {
        const product = await dbClient.product.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product' });
    }
});

productsRouter.put('/:id', adminMiddleware, async (req, res) => {
    const parsed = productSchemas.update.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ message: 'Validation failed' });
        return;
    }

    try {
        const updatedProduct = await dbClient.product.update({
            where: {
                id: req.params.id,
            },
            data: req.body,
        });

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product' });
    }
});

productsRouter.delete('/:id', adminMiddleware, async (req, res) => {
    try {
        await dbClient.product.delete({
            where: {
                id: req.params.id,
            },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
});
