import { expect, Page, BrowserContext, Cookie } from '@playwright/test';
import testData from '../utils/test-data.json';
import { getSessionUsernameCookie } from '../utils/cookies';
import { LOCATORS } from '../utils/locators';


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
        await this.page.fill(LOCATORS.login.username, testData.validUser.username);
        await this.page.fill(LOCATORS.login.password, testData.validUser.password);
        await this.page.click(LOCATORS.login.loginButton);

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
        const inventoryList = this.page.locator(LOCATORS.inventory.list);
        await expect(inventoryList).toBeVisible();
        const items = inventoryList.locator(LOCATORS.inventory.item);
        const itemCount = await items.count();
        expect(itemCount).toBeGreaterThan(0);

        return sessionCookie;
    }

    async loginWithBlockedUser(): Promise<void> {
        const errorLocator = this.page.locator(LOCATORS.login.errorMessage);

        await this.page.fill(LOCATORS.login.username, testData.blockedUser.username);
        await this.page.fill(LOCATORS.login.password, testData.blockedUser.password);
        await this.page.click(LOCATORS.login.loginButton);

        await this.page.waitForSelector(LOCATORS.login.errorMessage);

        await expect(errorLocator).toHaveText('Epic sadface: Sorry, this user has been locked out.');

        await expect(this.page).not.toHaveURL(/inventory.html/);
        await expect(this.page).toHaveURL(/\/$/);

        const sessionCookie = await getSessionUsernameCookie(this.context);
        expect(sessionCookie?.value).toBe('locked_out_user');
    }

    async loginWithInvalidUser(): Promise<void> {
        const errorLocator = this.page.locator(LOCATORS.login.errorMessage);

        await this.page.fill(LOCATORS.login.username, testData.invalidUser.username);
        await this.page.fill(LOCATORS.login.password, testData.invalidUser.password);
        await this.page.click(LOCATORS.login.loginButton);

        await this.page.waitForSelector(LOCATORS.login.errorMessage);

        await expect(errorLocator).toHaveText('Epic sadface: Username and password do not match any user in this service');

        await expect(this.page).not.toHaveURL(/inventory.html/);
        await expect(this.page).toHaveURL(/\/$/);

        const sessionCookie = await getSessionUsernameCookie(this.context);
        expect(sessionCookie).toBeUndefined();
    }
}
