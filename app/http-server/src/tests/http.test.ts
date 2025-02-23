import { faker } from '@faker-js/faker';
import { AXIOS, signin, signup } from '@repo/test-utils';

describe('Authentication', () => {
    it('allows a user to signup only once', async () => {
        const username = faker.internet.username();
        const password = faker.internet.password();

        const signupResponse = await signup({
            username,
            password,
            type: 'admin',
        });
        const duplicateSignupResponse = await signup({
            username,
            password,
            type: 'admin',
        });

        expect(signupResponse.status).toBe(200);
        expect(duplicateSignupResponse.status).toBe(400);
    });

    it('allows signin with correct credentials', async () => {
        const username = faker.internet.username();
        const password = faker.internet.password();

        await signup({
            username,
            password,
            type: 'admin',
        });
        const signinResponse = await signin({
            username,
            password,
        });

        expect(signinResponse.status).toBe(200);
        expect(signinResponse.data.token).toBeDefined();
    });

    test('denies signin with incorrect credentials', async () => {
        const username = faker.internet.username();
        const password = faker.internet.password();

        const signinResponse = await signin({
            username,
            password,
        });
        expect(signinResponse.status).toBe(403);
    });
});
