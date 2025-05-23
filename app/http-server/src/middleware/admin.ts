import type { NextFunction, Request, Response } from 'express';

import { verifyJwt } from '@repo/jwt-utils';

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const authToken = authHeader?.split(' ')[1];

    if (!authToken) {
        res.status(403).json({ message: 'Unauthorized - No token provided' });
        return;
    }

    try {
        const jwtPayload = verifyJwt(authToken);

        if (jwtPayload.role !== 'Admin') {
            res.status(403).json({
                messagee: 'Unauthorized - Only Admins can access',
            });
            return;
        }

        req.userId = jwtPayload.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized - Invalid token' });
        return;
    }
};

export default adminMiddleware;
