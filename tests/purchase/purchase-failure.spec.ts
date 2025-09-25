import { test as base } from '@playwright/test';
import { PurchasePage } from '../../pages/PurchasePage';

const test = base.extend<{
  purchasePage: PurchasePage;
}>({
  purchasePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: './auth.json'
    });
    const page = await context.newPage();
    const purchasePage = new PurchasePage(page);
    await purchasePage.inventoryPage();
    await use(purchasePage);
    await context.close();
  }
});

test('Failed purchase', async ({ purchasePage }) => {
  await purchasePage.buyProduct('Sauce Labs Backpack');
  await purchasePage.goToCart();
  await purchasePage.incompleteCheckout();
});