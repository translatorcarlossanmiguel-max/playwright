import { expect, Page, BrowserContext } from '@playwright/test';
import testData from '../utils/test-data.json';

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async goto() {
        await this.page.goto('/');
    }

    async loginWithValidUser(context: BrowserContext) {
        await this.page.fill('[data-test="username"]', testData.validUser.username);
        await this.page.fill('[data-test="password"]', testData.validUser.password);
        await this.page.click('[data-test="login-button"]');

        await expect(this.page).toHaveURL(/inventory\.html$/);
       
        // Capture cookies
        const cookies = await context.cookies();
        const sessionCookie = cookies.find(c => c.name === 'session-username');

        if (!sessionCookie) {
            throw new Error('❌ Session cookie not found after login!');
        }

        expect(sessionCookie?.value).toBe('standard_user');
        expect(sessionCookie?.domain).toBe('www.saucedemo.com');
        expect(sessionCookie?.expires).toBeGreaterThan(0);
        console.log('✅ Session cookie found:', sessionCookie?.value, sessionCookie?.domain, sessionCookie?.expires);

        // Verifica que el inventario esté presente y tenga al menos un item
        const inventoryList = this.page.locator('[data-test="inventory-list"]');
        await expect(inventoryList).toBeVisible();
        const items = inventoryList.locator('[data-test="inventory-item"]');
        const itemCount = await items.count();
        expect(itemCount).toBeGreaterThan(0);
        
        return sessionCookie;
    }

    async loginWithBlockedUser(context: BrowserContext) {
        const errorSelector = '[data-test="error"]';
        const errorLocator = this.page.locator(errorSelector);

        await this.page.fill('[data-test="username"]', testData.blockedUser.username);
        await this.page.fill('[data-test="password"]', testData.blockedUser.password);
        await this.page.click('[data-test="login-button"]');

        await this.page.waitForSelector(errorSelector);
        await expect(errorLocator).toHaveText('Epic sadface: Sorry, this user has been locked out.');

        await expect(this.page).not.toHaveURL(/inventory.html/);
        await expect(this.page).toHaveURL(/\/$/);

        const cookies = await context.cookies();
        const sessionCookie = cookies.find(c => c.name === 'session-username');
        expect(sessionCookie?.value).toBe('locked_out_user');
    }

    async loginWithInvalidUser(context: BrowserContext) {
        const errorSelector = '[data-test="error"]';
        const errorLocator = this.page.locator(errorSelector);

        await this.page.fill('[data-test="username"]', testData.invalidUser.username);
        await this.page.fill('[data-test="password"]', testData.invalidUser.password);
        await this.page.click('[data-test="login-button"]');

        await this.page.waitForSelector(errorSelector);
        await expect(errorLocator).toHaveText('Epic sadface: Username and password do not match any user in this service');

        await expect(this.page).not.toHaveURL(/inventory.html/);
        await expect(this.page).toHaveURL(/\/$/);

        const cookies = await context.cookies();
        const sessionCookie = cookies.find(c => c.name === 'session-username');
        expect(sessionCookie).toBeUndefined();

    }
}