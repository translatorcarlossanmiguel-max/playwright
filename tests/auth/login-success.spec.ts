import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Successful login', async ({ page, context }) => {
    const loginPage = new LoginPage(page, context);
    await loginPage.goto();
    await loginPage.loginWithValidUser(context);

  
});
