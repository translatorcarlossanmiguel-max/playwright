import { expect, Page } from '@playwright/test';
import testData from '../utils/test-data.json';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async loginWithValidUser() {
    await this.page.fill('[data-test="username"]', testData.validUser.username);
    await this.page.fill('[data-test="password"]', testData.validUser.password);
    await this.page.click('[data-test="login-button"]');
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  async loginWithBlockedUser() {
    
    const errorSelector = '[data-test="error"]';
    const errorLocator = this.page.locator(errorSelector);

    await this.page.fill('[data-test="username"]', testData.blockedUser.username);
    await this.page.fill('[data-test="password"]', testData.blockedUser.password);
    await this.page.click('[data-test="login-button"]');

    await this.page.waitForSelector(errorSelector);
    await expect(errorLocator).toHaveText('Epic sadface: Sorry, this user has been locked out.');

    await expect(this.page).not.toHaveURL(/inventory.html/);
  }

  async loginWithInvalidUser(){
    const errorSelector = '[data-test="error"]';
    const errorLocator = this.page.locator(errorSelector);

    await this.page.fill('[data-test="username"]', testData.invalidUser.username);
    await this.page.fill('[data-test="password"]', testData.invalidUser.password);
    await this.page.click('[data-test="login-button"]');

    await this.page.waitForSelector(errorSelector);
    await expect(errorLocator).toHaveText('Epic sadface: Username and password do not match any user in this service');

    await expect(this.page).not.toHaveURL(/inventory.html/);
  }
}
