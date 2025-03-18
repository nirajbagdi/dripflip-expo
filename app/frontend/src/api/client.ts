import axios from 'axios';

import { SearchParams } from '../../app/types';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export type SwipeAction = 'LIKE' | 'IGNORE';

export const productAPI = {
    search: async (params: SearchParams) => {
        const response = await apiClient.get('/product/search', { params });
        return response.data;
    },

    getSwipeQueue: async () => {
        const response = await apiClient.get('/products/queue');
        return response.data;
    },
};

export const swipeAPI = {
    createSwipe: async (productId: string, action: SwipeAction) => {
        const response = await apiClient.post('/swipes', { productId, action });
        return response.data;
    },

    getHistory: async (params: { limit: number; cursor?: string }) => {
        const response = await apiClient.get('/swipes/history', { params });
        return response.data;
    },
};
