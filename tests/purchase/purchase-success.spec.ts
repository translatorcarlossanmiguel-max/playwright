import { test, expect } from '@playwright/test';
import { PurchasePage } from '../../pages/PurchasePage';

test('Successful purchase', async ({ browser }) => {
    // Login
    const context = await browser.newContext({
        storageState: './auth.json'
    });

    const page = await context.newPage();
    await page.goto('/inventory.html');

    // Purchase
    const purchasePage = new PurchasePage(page);
    const { name, price } = await purchasePage.buyProduct('Sauce Labs Backpack');

    console.log('Product bought:', name, price);

    await purchasePage.goToCart();
    const cartName = await page.locator('.inventory_item_name').textContent();
    const cartPrice = await page.locator('.inventory_item_price').textContent();

    expect(cartName).toBe(name);
    expect(cartPrice).toBe(price);

    // Complete checkout
    await purchasePage.completeCheckout();

    // Verify success message
    await purchasePage.checkoutOverview(
        cartName ?? '',
        cartPrice ?? ''
    );
    await purchasePage.completedCheckout();
});
