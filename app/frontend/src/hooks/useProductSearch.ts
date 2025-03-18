import { useState } from 'react';
import { searchProducts, SearchParams } from '../api/products';

export const useProductSearch = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (params: SearchParams) => {
        try {
            setLoading(true);
            setError(null);
            const data = await searchProducts(params);
            setProducts(data.products);
        } catch (err) {
            setError('Failed to search products');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error, search };
};
