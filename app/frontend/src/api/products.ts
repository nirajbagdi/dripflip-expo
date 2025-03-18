import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

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
