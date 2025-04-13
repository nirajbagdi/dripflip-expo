import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { productAPI, type SwipeAction } from '../api/client';

export function useProductQueue() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Use the search endpoint to get products
            const response = await productAPI.search({});
            setProducts(response.products || []);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSwipe = useCallback(
        async (productId: string, action: SwipeAction) => {
            try {
                // In a real implementation, we would call the API
                // await swipeAPI.createSwipe(productId, action)
                console.log(`Swiped ${action} on product ${productId}`);

                // For now, just log the action
                if (action === 'LIKE') {
                    Alert.alert(
                        'Added to favorites!',
                        'You can find this item in your liked products.'
                    );
                }
            } catch (err) {
                console.error('Error recording swipe:', err);
            }
        },
        []
    );

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        refreshProducts: fetchProducts,
        handleSwipe,
    };
}
