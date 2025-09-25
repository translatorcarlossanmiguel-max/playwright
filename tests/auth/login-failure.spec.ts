import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Invalid login - Blocked user', async ({ page, context }) => {
    const loginPage = new LoginPage(page, context);

    await loginPage.goto();
    await loginPage.loginWithBlockedUser(context);
});
test('Invalid login - Invalid user', async ({ page, context }) => {
    const loginPage = new LoginPage(page, context);

    await loginPage.goto();
    await loginPage.loginWithInvalidUser(context);
});