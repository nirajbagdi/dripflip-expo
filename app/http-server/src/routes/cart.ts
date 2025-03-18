import { Router } from 'express';
import dbClient from '@repo/db/client';
import userMiddleware from '../middleware/user';
import { cartSchemas } from '../schemas';

export const cartRouter = Router();

cartRouter.get('/', userMiddleware, async (req, res) => {
    try {
        const cart = await dbClient.cart.findFirst({
            where: { userId: req.userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
            return;
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

cartRouter.post('/items', userMiddleware, async (req, res) => {
    const parsed = cartSchemas.addItem.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ message: 'Invalid request body' });
        return;
    }

    const { productId, quantity } = parsed.data;

    try {
        let cart = await dbClient.cart.findFirst({
            where: { userId: req.userId },
        });

        if (!cart) {
            cart = await dbClient.cart.create({
                data: { userId: req.userId! },
            });
        }

        const existingItem = await dbClient.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId,
            },
        });

        if (existingItem) {
            await dbClient.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        } else {
            await dbClient.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });
        }

        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

cartRouter.put('/items/:itemId', userMiddleware, async (req, res) => {
    const parsed = cartSchemas.updateItem.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ message: 'Invalid request body' });
        return;
    }

    const { itemId } = req.params;
    const { quantity } = parsed.data;

    try {
        const updated = await dbClient.cartItem.update({
            where: { id: itemId },
            data: { quantity },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

cartRouter.delete('/items/:itemId', userMiddleware, async (req, res) => {
    const { itemId } = req.params;

    try {
        await dbClient.cartItem.delete({
            where: { id: itemId },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
