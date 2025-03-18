import z from 'zod';

export const authSchemas = {
    signup: z.object({
        username: z.string(),
        password: z.string().min(6),
        type: z.enum(['admin', 'user']),
    }),

    signin: z.object({
        username: z.string(),
        password: z.string(),
    }),
};

export const productSchemas = {
    create: z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.number().positive(),
        brand: z.string(),
        category: z.string(),
        image: z.string().url(),
        stock: z.number().int(),
        sustainabilityBadge: z.array(z.string()).optional(),
    }),

    update: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().positive().optional(),
        brand: z.string().optional(),
        category: z.string().optional(),
        image: z.string().url().optional(),
        stock: z.number().int().optional(),
        sustainabilityBadge: z.array(z.string()).optional(),
    }),
};

export const cartSchemas = {
    addItem: z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
    }),

    updateItem: z.object({
        quantity: z.number().int().positive(),
    }),
};

declare global {
    namespace Express {
        export interface Request {
            role?: 'Admin' | 'User';
            userId?: string;
        }
    }
}
