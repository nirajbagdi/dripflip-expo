import jwt from 'jsonwebtoken';
import type { SignOptions, VerifyOptions } from 'jsonwebtoken';

const JWT_SECRET_KEY =
    '0046584804a4ed16e960c425d8dbee4a241326f179d3617c3984e764fe4df5bc';

type JwtPayload = {
    userId?: string;
    role?: 'Admin' | 'User';
};

export const createJwt = (payload: JwtPayload, options?: SignOptions) =>
    jwt.sign(payload, JWT_SECRET_KEY, { ...options });

export const verifyJwt = (token: string, options?: VerifyOptions) =>
    jwt.verify(token, JWT_SECRET_KEY, { ...options }) as JwtPayload;
