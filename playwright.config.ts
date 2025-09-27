import { defineConfig } from '@playwright/test';

export default defineConfig({
    retries: 0,
    workers: 2,
    fullyParallel: true,
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: false,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    }
});