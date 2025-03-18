import { Router } from 'express';
import { productSchemas } from '../schemas';
import { products } from '../data/products';

const router = Router();

router.get('/search', async (req, res) => {
    try {
        const params = productSchemas.search.parse(req.query);
        const skip = (params.page - 1) * params.limit;

        let filteredProducts = [...products];

        // Apply filters
        if (params.query) {
            const query = params.query.toLowerCase();
            filteredProducts = filteredProducts.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        if (params.category) {
            filteredProducts = filteredProducts.filter(
                (p) => p.category === params.category
            );
        }

        if (params.brand) {
            filteredProducts = filteredProducts.filter(
                (p) => p.brand === params.brand
            );
        }

        if (params.minPrice) {
            filteredProducts = filteredProducts.filter(
                (p) => p.price >= params.minPrice!
            );
        }

        if (params.maxPrice) {
            filteredProducts = filteredProducts.filter(
                (p) => p.price <= params.maxPrice!
            );
        }

        // Apply sorting
        if (params.sortBy) {
            switch (params.sortBy) {
                case 'price_asc':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price_desc':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    // For dummy data, we'll just keep original order
                    break;
            }
        }

        // Apply pagination
        const paginatedProducts = filteredProducts.slice(skip, skip + params.limit);

        res.json({
            products: paginatedProducts,
            page: params.page,
            totalPages: Math.ceil(filteredProducts.length / params.limit),
            totalItems: filteredProducts.length,
        });
    } catch (error) {
        res.status(400).json({ error: 'Invalid search parameters' });
    }
});

export { router as productRouter };
