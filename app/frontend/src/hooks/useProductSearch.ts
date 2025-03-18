import { useState, useCallback } from 'react';

import { productAPI } from '../api/client';
import { SearchParams } from '../../app/types';

export const useProductSearch = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 0,
        totalItems: 0,
    });

    const searchProducts = useCallback(async (params: SearchParams) => {
        try {
            setLoading(true);
            setError(null);

            const data = await productAPI.search(params);

            setProducts(data.products);
            setPagination({
                page: data.page,
                totalPages: data.totalPages,
                totalItems: data.totalItems,
            });
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    const loadMore = useCallback(async () => {
        if (loading || pagination.page >= pagination.totalPages) return;

        try {
            setLoading(true);
            const data = await productAPI.search({
                // ...lastSearchParams ?? {},
                page: pagination.page + 1,
            });
            setProducts((prev) => [...prev, ...data.products] as []);
            setPagination({
                page: data.page,
                totalPages: data.totalPages,
                totalItems: data.totalItems,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [pagination, loading]);

    return {
        products,
        loading,
        error,
        pagination,
        searchProducts,
        loadMore,
    };
};
