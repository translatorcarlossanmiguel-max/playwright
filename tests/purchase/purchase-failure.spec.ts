import { test, expect } from '@playwright/test';
import { PurchasePage } from '../../pages/PurchasePage';

test('Failed purchase', async ({ browser }) => {
    // Login
    const context = await browser.newContext({
        storageState: './auth.json'
    });
    const page = await context.newPage();
    await page.goto('/inventory.html');

    // Purchase
    const purchasePage = new PurchasePage(page);

    await purchasePage.buyProduct('Sauce Labs Backpack');

    await purchasePage.goToCart();

    // Complete checkout
    await purchasePage.incompleteCheckout();
});
