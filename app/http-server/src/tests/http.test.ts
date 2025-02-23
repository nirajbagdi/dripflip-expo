import { faker } from '@faker-js/faker';
import { AXIOS, signin, signup } from '@repo/test-utils';

describe('Authentication', () => {
    it('allows a user to signup only once', async () => {
        const username = faker.internet.username();
        const password = faker.internet.password();

        const signupResponse = await signup({ username, password, type: 'admin' });
        const duplicateSignupResponse = await signup({ username, password });

        expect(signupResponse.status).toBe(200);
        expect(duplicateSignupResponse.status).toBe(400);
    });

    it('allows signin with correct credentials', async () => {
        const username = faker.internet.username();
        const password = faker.internet.password();

        await signup({ username, password, type: 'admin' });
        const signinResponse = await signin({ username, password });

        expect(signinResponse.status).toBe(200);
        expect(signinResponse.data.token).toBeDefined();
    });

    test('denies signin with incorrect credentials', async () => {
        const username = faker.internet.username();
        const password = faker.internet.password();

        const signinResponse = await signin({ username, password });
        expect(signinResponse.status).toBe(403);
    });
});

describe('Product Management', () => {
    let adminAuthToken: string | null = null;

    beforeAll(async () => {
        const username = faker.internet.username();
        const password = faker.internet.password();

        await signup({ username, password, type: 'admin' });

        const signinResponse = await signin({ username, password });
        adminAuthToken = signinResponse.data.token;
    });

    it('should create a new product (Admin only)', async () => {
        const newProductResponse = await AXIOS.post({
            url: '/api/products',
            authToken: adminAuthToken,
            data: {
                name: 'Test Sneakers',
                description: 'High-quality sneakers',
                price: 99.99,
                brand: 'Nike',
                category: 'Shoes',
                image: 'https://example.com/sneakers.jpg',
                stock: 50,
                sustainabilityBadge: ['Eco-Friendly'],
            },
        });
        const { productId: newProductId } = newProductResponse.data;

        expect(newProductResponse.status).toBe(201);
        expect(newProductId).toBeDefined();
    });

    it('should retrieve all products', async () => {
        const newProductResponse = await AXIOS.post({
            url: '/api/products',
            authToken: adminAuthToken,
            data: {
                name: 'Test Sneakers',
                description: 'High-quality sneakers',
                price: 99.99,
                brand: 'Nike',
                category: 'Shoes',
                image: 'https://example.com/sneakers.jpg',
                stock: 50,
                sustainabilityBadge: ['Eco-Friendly'],
            },
        });
        const { productId: newProductId } = newProductResponse.data;

        const allProductsResponse = await AXIOS.get({
            url: '/api/products',
            authToken: adminAuthToken,
        });
        const { products } = allProductsResponse.data;

        expect(newProductResponse.status).toBe(201);
        expect(products.some((p: any) => p.id === newProductId)).toBe(true);
    });

    it('should retrieve a specific product by valid id', async () => {
        const newProductResponse = await AXIOS.post({
            url: '/api/products',
            authToken: adminAuthToken,
            data: {
                name: 'Test Sneakers',
                description: 'High-quality sneakers',
                price: 99.99,
                brand: 'Nike',
                category: 'Shoes',
                image: 'https://example.com/sneakers.jpg',
                stock: 50,
                sustainabilityBadge: ['Eco-Friendly'],
            },
        });
        const { productId: newProductId } = newProductResponse.data;

        const productResponse = await AXIOS.get({
            url: `/api/products/${newProductId}`,
            authToken: adminAuthToken,
        });

        expect(productResponse.status).toBe(200);
        expect(productResponse.data.name).toBe('Test Sneakers');
        expect(productResponse.data.category).toBe('Shoes');
    });

    it('should update an existing product (Admin only)', async () => {
        const newProductResponse = await AXIOS.post({
            url: '/api/products',
            authToken: adminAuthToken,
            data: {
                name: 'Test Sneakers',
                description: 'High-quality sneakers',
                price: 99.99,
                brand: 'Nike',
                category: 'Shoes',
                image: 'https://example.com/sneakers.jpg',
                stock: 50,
                sustainabilityBadge: ['Eco-Friendly'],
            },
        });
        const { productId: newProductId } = newProductResponse.data;

        const updateProductResponse = await AXIOS.put({
            url: `/api/products/${newProductId}`,
            authToken: adminAuthToken,
            data: {
                price: 89.99,
                stock: 45,
            },
        });

        expect(updateProductResponse.status).toBe(200);
        expect(updateProductResponse.data.price).toBe(89.99);
        expect(updateProductResponse.data.stock).toBe(45);
    });

    it('should delete a product (Admin only)', async () => {
        const newProductResponse = await AXIOS.post({
            url: '/api/products',
            authToken: adminAuthToken,
            data: {
                name: 'Test Sneakers',
                description: 'High-quality sneakers',
                price: 99.99,
                brand: 'Nike',
                category: 'Shoes',
                image: 'https://example.com/sneakers.jpg',
                stock: 50,
                sustainabilityBadge: ['Eco-Friendly'],
            },
        });
        const { productId: newProductId } = newProductResponse.data;

        const deleteProductResponse = await AXIOS.delete({
            url: `/api/products/${newProductId}`,
            authToken: adminAuthToken,
        });

        expect(deleteProductResponse.status).toBe(204);
    });

    it('should prevent non-admins from creating a product', async () => {
        const newProductResponse = await AXIOS.post({
            url: '/api/products',
            data: {
                name: 'Test Sneakers',
                description: 'High-quality sneakers',
                price: 99.99,
                brand: 'Nike',
                category: 'Shoes',
                image: 'https://example.com/sneakers.jpg',
                stock: 50,
                sustainabilityBadge: ['Eco-Friendly'],
            },
        });

        expect(newProductResponse.status).toBe(403);
    });
});
