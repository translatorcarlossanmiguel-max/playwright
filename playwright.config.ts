import { defineConfig } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
    retries: 2,
    workers: 2,
    fullyParallel: true,
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: isCI ? true : false,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    }
});