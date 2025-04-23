export type CardItemT = {
    id?: string;
    description?: string;
    hasActions?: boolean;
    hasVariant?: boolean;
    image: any;
    isOnline?: boolean;
    matches?: string;
    name: string;
    price?: string | number;
    brand?: string;
    sustainabilityBadge?: string[];
};

export type IconT = {
    name: any;
    size: number;
    color: string;
    style?: any;
};

export type MessageT = {
    image: any;
    lastMessage: string;
    name: string;
};

export type ProfileItemT = {
    age?: string;
    info1?: string;
    info2?: string;
    info3?: string;
    info4?: string;
    location?: string;
    matches: string;
    name: string;
};

export type TabBarIconT = {
    focused: boolean;
    iconName: any;
    text: string;
};

export type DataT = {
    id: number;
    name: string;
    isAvailable: boolean;
    price: string;
    description: string;
    details: string;
    image: string;
};

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
