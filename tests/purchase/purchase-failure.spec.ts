import { test as base } from '@playwright/test';
import { PurchasePage } from '../../pages/PurchasePage';

const test = base.extend<{
    purchasePage: PurchasePage;
}>({
    purchasePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: 'cookies/cartAuth.json'
        });
        const page = await context.newPage();
        const purchasePage = new PurchasePage(page);
        await purchasePage.checkoutPage();
        await use(purchasePage);
        await context.close();
    }
});

test('Failed checkout', async ({ purchasePage }) => {
    await purchasePage.incompleteCheckout();
});