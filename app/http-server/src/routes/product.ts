import { Router } from 'express';
import dbClient from '@repo/db/client';
import { productSchemas } from '../schemas';

const router = Router();

router.get('/search', async (req, res) => {
    try {
        const params = productSchemas.search.parse(req.query);
        const skip = (params.page - 1) * params.limit;

        // Build where clause
        const where: any = {};

        if (params.query) {
            where.OR = [
                { name: { contains: params.query, mode: 'insensitive' } },
                { description: { contains: params.query, mode: 'insensitive' } },
            ];
        }

        if (params.category) where.category = params.category;
        if (params.brand) where.brand = params.brand;

        if (params.minPrice || params.maxPrice) {
            where.price = {};
            if (params.minPrice) where.price.gte = params.minPrice;
            if (params.maxPrice) where.price.lte = params.maxPrice;
        }

        // Build sort object
        const orderBy: any = {};
        switch (params.sortBy) {
            case 'price_asc':
                orderBy.price = 'asc';
                break;
            case 'price_desc':
                orderBy.price = 'desc';
                break;
            case 'newest':
                orderBy.createdAt = 'desc';
                break;
            default:
                orderBy.name = 'asc';
        }

        // Execute query with pagination
        const [products, total] = await Promise.all([
            dbClient.product.findMany({
                where,
                orderBy,
                skip,
                take: params.limit,
            }),
            dbClient.product.count({ where }),
        ]);

        res.json({
            products,
            page: params.page,
            totalPages: Math.ceil(total / params.limit),
            totalItems: total,
        });
    } catch (error) {
        res.status(400).json({ error: 'Invalid search parameters' });
    }
});

export { router as productRouter };
