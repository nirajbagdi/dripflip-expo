import { Router } from 'express';
import dbClient from '@repo/db/client';
import userMiddleware from '../middleware/user';
import adminMiddleware from '../middleware/admin';
import { orderSchemas } from '../schemas';

export const ordersRouter = Router();

// Create order from cart
ordersRouter.post('/', userMiddleware, async (req, res) => {
    const parsed = orderSchemas.create.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ message: 'Invalid request body' });
        return;
    }

    try {
        const cart = await dbClient.cart.findFirst({
            where: {
                id: parsed.data.cartId,
                userId: req.userId,
            },
            include: {
                items: {
                    include: { product: true },
                },
            },
        });

        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
            return;
        }

        const total = cart.items.reduce(
            (sum, item) => sum + item.quantity * item.product.price,
            0
        );

        const order = await dbClient.order.create({
            data: {
                userId: req.userId!,
                total,
                items: {
                    create: cart.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                },
            },
        });

        // Clear the cart after order creation
        await dbClient.cartItem.deleteMany({ where: { cartId: cart.id } });
        await dbClient.cart.delete({ where: { id: cart.id } });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order' });
    }
});

// Get user orders
ordersRouter.get('/', userMiddleware, async (req, res) => {
    try {
        const orders = await dbClient.order.findMany({
            where: { userId: req.userId },
            include: {
                items: {
                    include: { product: true },
                },
            },
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
});

// Get specific order
ordersRouter.get('/:id', userMiddleware, async (req, res) => {
    try {
        const order = await dbClient.order.findFirst({
            where: {
                id: req.params.id,
                userId: req.userId,
            },
            include: {
                items: {
                    include: { product: true },
                },
            },
        });

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order' });
    }
});

// Update order status (Admin only)
ordersRouter.patch('/:id/status', adminMiddleware, async (req, res) => {
    const parsed = orderSchemas.updateStatus.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ message: 'Invalid status' });
        return;
    }

    try {
        const order = await dbClient.order.update({
            where: { id: req.params.id },
            data: { status: parsed.data.status },
        });

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status' });
    }
});
