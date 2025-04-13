import axios from 'axios';
import Constants from 'expo-constants';

const API_URL =
    Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL ||
    'http://192.168.0.182:3000/api';

export type SearchParams = {
    query?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    sortBy?: 'price_asc' | 'price_desc' | 'newest';
    page?: number;
    limit?: number;
};

export const searchProducts = async (params: SearchParams) => {
    const response = await axios.get(`${API_URL}/product/search`, { params });
    return response.data;
};
