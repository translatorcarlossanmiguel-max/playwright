import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { PurchasePage } from '../../pages/PurchasePage';

test('Successful purchase', async ({ page }) => {
  // Login
  const loginPage = new LoginPage(page);
    
  await loginPage.goto();
  await loginPage.loginWithValidUser();

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
