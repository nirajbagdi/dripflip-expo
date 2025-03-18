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

describe('Cart', () => {
    let authToken: string;
    let productId: string;

    beforeAll(async () => {
        const username = faker.internet.username();
        const password = faker.internet.password();

        await signup({ username, password, type: 'admin' });

        const signinResponse = await signin({ username, password });
        authToken = signinResponse.data.token;

        const productResponse = await AXIOS.post({
            url: '/api/products',
            authToken: authToken,
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
        const { productId: newProductId } = productResponse.data;
        productId = newProductId;
    });

    it('should add item to cart', async () => {
        const response = await AXIOS.post({
            url: '/api/cart/items',
            authToken,
            data: {
                productId,
                quantity: 1,
            },
        });

        expect(response.status).toBe(201);
    });

    it('should get user cart', async () => {
        const response = await AXIOS.get({
            url: '/api/cart',
            authToken,
        });

        expect(response.status).toBe(200);
        expect(response.data.items).toBeDefined();
    });

    it('should update cart item quantity', async () => {
        const cartResponse = await AXIOS.get({
            url: '/api/cart',
            authToken,
        });
        const itemId = cartResponse.data.items[0].id;

        const response = await AXIOS.put({
            url: `/api/cart/items/${itemId}`,
            authToken,
            data: {
                quantity: 2,
            },
        });

        expect(response.status).toBe(200);
        expect(response.data.quantity).toBe(2);
    });

    it('should remove item from cart', async () => {
        const cartResponse = await AXIOS.get({
            url: '/api/cart',
            authToken,
        });
        const itemId = cartResponse.data.items[0].id;

        const response = await AXIOS.delete({
            url: `/api/cart/items/${itemId}`,
            authToken,
        });

        expect(response.status).toBe(204);
    });
});

describe('Order Management', () => {
    let authToken: string;
    let cartId: string;
    let productId: string;

    beforeAll(async () => {
        const username = faker.internet.username();
        const password = faker.internet.password();

        await signup({ username, password, type: 'admin' });
        const signinResponse = await signin({ username, password });
        authToken = signinResponse.data.token;

        const productResponse = await AXIOS.post({
            url: '/api/products',
            authToken: authToken,
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
        const { productId: newProductId } = productResponse.data;
        productId = newProductId;

        // Create a cart with items
        await AXIOS.post({
            url: '/api/cart/items',
            authToken,
            data: {
                productId,
                quantity: 2,
            },
        });

        const getCartResponse = await AXIOS.get({
            url: '/api/cart',
            authToken,
        });

        cartId = getCartResponse.data.id;
    });

    it('should create an order from cart', async () => {
        const response = await AXIOS.post({
            url: '/api/orders',
            authToken,
            data: { cartId },
        });

        expect(response.status).toBe(201);
        expect(response.data.total).toBeDefined();
        expect(response.data.status).toBe('PENDING');
    });

    it('should get user orders', async () => {
        const response = await AXIOS.get({
            url: '/api/orders',
            authToken,
        });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    it('should update order status (Admin only)', async () => {
        const ordersResponse = await AXIOS.get({
            url: '/api/orders',
            authToken,
        });

        const orderId = ordersResponse.data[0].id;

        const response = await AXIOS.patch({
            url: `/api/orders/${orderId}/status`,
            authToken,
            data: { status: 'PROCESSING' },
        });

        expect(response.status).toBe(200);
        expect(response.data.status).toBe('PROCESSING');
    });
});
