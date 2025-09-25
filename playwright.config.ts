import { defineConfig } from '@playwright/test';

export default defineConfig({
    workers: 1,
    fullyParallel: true,
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: true,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    }
});
