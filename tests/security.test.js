
const http = require('../lib/http');

describe('Security hardening', () => {
    // Save original adapter
    const originalAdapter = http.defaults.adapter;

    beforeAll(() => {
        // Mock adapter to prevent actual network calls
        http.defaults.adapter = async (config) => {
            return {
                data: { success: true },
                status: 200,
                statusText: 'OK',
                headers: {},
                config,
                request: {}
            };
        };
    });

    afterAll(() => {
        http.defaults.adapter = originalAdapter;
    });

    test('should allow requests to allowed hosts', async () => {
        const response = await http.get('https://api.kkiapay.me/api/v1/test');
        expect(response.status).toBe(200);
    });

    test('should allow requests to sandbox allowed hosts', async () => {
        const response = await http.get('https://api-sandbox.kkiapay.me/api/v1/test');
        expect(response.status).toBe(200);
    });

    test('should BLOCK requests to unauthorized hosts (SSRF protection)', async () => {
        await expect(http.get('https://evil.com/hack')).rejects.toThrow(/Security Error/);
        await expect(http.get('https://google.com')).rejects.toThrow(/Security Error/);
        await expect(http.get('http://localhost:3000')).rejects.toThrow(/Security Error/);
    });

    test('should respect max content length configuration', () => {
        expect(http.defaults.maxBodyLength).toBeDefined();
        expect(http.defaults.maxContentLength).toBeDefined();
        expect(http.defaults.timeout).toBe(5000);
    });

    test('should handle relative URLs if baseURL is correct', async () => {
        // Set a valid baseURL
        const originalBase = http.defaults.baseURL;
        http.defaults.baseURL = 'https://api.kkiapay.me';
        
        try {
            const response = await http.get('/api/v1/user');
            expect(response.status).toBe(200);
        } finally {
            http.defaults.baseURL = originalBase;
        }
    });

    test('should BLOCK relative URLs if baseURL is unauthorized', async () => {
        const originalBase = http.defaults.baseURL;
        http.defaults.baseURL = 'https://evil.com';
        
        try {
            await expect(http.get('/api/v1/user')).rejects.toThrow(/Security Error/);
        } finally {
            http.defaults.baseURL = originalBase;
        }
    });
});
