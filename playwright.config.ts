import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://www.saucedemo.com', // 👈 your app’s base URL
    headless: true,
    viewport: { width: 1280, height: 720 }
  }
});
