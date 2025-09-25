import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page, context }, use) => {
    const loginPage = new LoginPage(page, context);
    await loginPage.open();
    await use(loginPage);
  }
});

test('Successful login', async ({ loginPage }) => {
    await loginPage.loginWithValidUser();
});