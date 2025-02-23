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

declare global {
    namespace Express {
        export interface Request {
            role?: 'Admin' | 'User';
            userId?: string;
        }
    }
}
