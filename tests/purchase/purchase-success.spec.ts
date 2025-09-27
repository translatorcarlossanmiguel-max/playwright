import { test as base, expect } from '@playwright/test';
import { PurchasePage } from '../../pages/PurchasePage';

const test = base.extend<{
    purchasePage: PurchasePage;
}>({
    purchasePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: 'cookies/auth.json'
        });
        const page = await context.newPage();
        const purchasePage = new PurchasePage(page);
        await purchasePage.inventoryPage();
        await use(purchasePage);
        await context.close();
    }
});

test('Successful purchase', async ({ purchasePage }) => {
    const page = purchasePage['page'];

    await purchasePage.buyProduct();

    await purchasePage.goToCart();


    // Complete checkout
    await purchasePage.completeCheckout();

    // Verify success message
    await purchasePage.checkoutOverview(
        purchasePage['productName'] ?? '',
        purchasePage['productPrice'] ?? ''
    );

    await purchasePage.completedCheckout();
});
