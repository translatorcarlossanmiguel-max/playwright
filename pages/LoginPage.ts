import { expect, Page, BrowserContext, Cookie } from '@playwright/test';
import testData from '../utils/test-data.json';
import { getSessionUsernameCookie } from '../utils/cookies';

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }
    
  async open() {
    await this.page.goto('/');
  }

       async loginWithValidUser(): Promise<Cookie> {
        await this.page.fill('[data-test="username"]', testData.validUser.username);
        await this.page.fill('[data-test="password"]', testData.validUser.password);
        await this.page.click('[data-test="login-button"]');

        await expect(this.page).toHaveURL(/inventory\.html$/);

        // Capture cookies
        const sessionCookie = await getSessionUsernameCookie(this.context);
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

  async loginWithBlockedUser(): Promise<void> {
        const errorSelector = '[data-test="error"]';
        const errorLocator = this.page.locator(errorSelector);

        await this.page.fill('[data-test="username"]', testData.blockedUser.username);
        await this.page.fill('[data-test="password"]', testData.blockedUser.password);
        await this.page.click('[data-test="login-button"]');

        await this.page.waitForSelector(errorSelector);
        await expect(errorLocator).toHaveText('Epic sadface: Sorry, this user has been locked out.');

        await expect(this.page).not.toHaveURL(/inventory.html/);
        await expect(this.page).toHaveURL(/\/$/);

        const sessionCookie = await getSessionUsernameCookie(this.context);
        expect(sessionCookie?.value).toBe('locked_out_user');
    }

    async loginWithInvalidUser(): Promise<void> {
        const errorSelector = '[data-test="error"]';
        const errorLocator = this.page.locator(errorSelector);

        await this.page.fill('[data-test="username"]', testData.invalidUser.username);
        await this.page.fill('[data-test="password"]', testData.invalidUser.password);
        await this.page.click('[data-test="login-button"]');

        await this.page.waitForSelector(errorSelector);
        await expect(errorLocator).toHaveText('Epic sadface: Username and password do not match any user in this service');

        await expect(this.page).not.toHaveURL(/inventory.html/);
        await expect(this.page).toHaveURL(/\/$/);

        const sessionCookie = await getSessionUsernameCookie(this.context);
        expect(sessionCookie).toBeUndefined();

    }
}