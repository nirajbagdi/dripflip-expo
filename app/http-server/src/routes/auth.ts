import { Router } from 'express';
import bcrypt from 'bcryptjs';

import dbClient from '@repo/db/client';
import { createJwt } from '@repo/jwt-utils';

import { authSchemas } from '../schemas';

export const authRouter = Router();

const SALT_ROUNDS = 10;

enum UserRoles {
    admin = 'Admin',
    user = 'User',
}

authRouter.post('/signup', async (req, res) => {
    const parsed = authSchemas.signup.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ message: 'Validation failed' });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(parsed.data.password, SALT_ROUNDS);

        const existingUser = await dbClient.user.findUnique({
            where: { username: parsed.data.username },
        });

        if (existingUser) {
            res.status(400).json({ message: 'Username already exists.' });
            return;
        }

        const newUser = await dbClient.user.create({
            data: {
                username: parsed.data.username,
                password: hashedPassword,
                role: UserRoles[parsed.data.type],
            },
        });

        res.status(200).json({ userId: newUser.id });
    } catch (error) {
        res.status(400).json({ message: 'User already exists' });
    }
});

authRouter.post('/signin', async (req, res) => {
    const parsed = authSchemas.signin.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ message: 'Validation failed' });
        return;
    }

    try {
        const existingUser = await dbClient.user.findUnique({
            where: {
                username: parsed.data.username,
            },
        });

        if (!existingUser) {
            res.status(403).json({ message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(
            parsed.data.password,
            existingUser.password
        );

        if (!isPasswordValid) {
            res.status(403).json({ message: 'Invalid credentials' });
            return;
        }

        const token = createJwt({
            userId: existingUser.id,
            role: existingUser.role,
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Internal server error' });
    }
});
