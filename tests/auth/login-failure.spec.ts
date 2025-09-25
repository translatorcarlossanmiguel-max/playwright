import { test, expect, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page, context }) => {
    loginPage = new LoginPage(page, context);
    await loginPage.open();
});

test('Invalid login - Blocked user', async () => {
    await loginPage.loginWithBlockedUser();
});

test('Invalid login - Invalid user', async () => {
    await loginPage.loginWithInvalidUser();
});