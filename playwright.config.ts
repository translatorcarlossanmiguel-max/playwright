import { defineConfig } from '@playwright/test';

const isCI = !!process.env.CI;

const QA = process.env.ENV || 'QA';

const PROD = process.env.ENV || 'PROD';

const envUrls: Record<string, string> = {
    DEV: 'https://dev.saucedemo.com',
    QA: 'https://www.saucedemo.com', 
};

const ENV = (process.env.ENV || 'QA').toUpperCase();
const baseURL = envUrls[ENV] || envUrls.QA;

export default defineConfig({
    retries: 2,
    workers: 2,
    fullyParallel: true,
    use: {
        baseURL,
        headless: isCI ? true : false,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        launchOptions: {
            env: {
                ...process.env,
                ENV
            }
        },
    }
});