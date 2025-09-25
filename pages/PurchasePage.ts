import { Page, expect } from '@playwright/test';
import testData from '../utils/test-data.json';

export class PurchasePage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    async buyProduct(productName: string) {

        const productLocator = this.page.locator('[data-test="inventory-list"] div')
            .filter({ hasText: productName });

        const name = await productLocator.locator('.inventory_item_name').textContent();
        const price = await productLocator.locator('.inventory_item_price').textContent();

        const removeButton = this.page.locator('[data-test="remove-sauce-labs-backpack"]');

        await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await expect(removeButton).toBeVisible();

        return { name, price };
    }

    async goToCart() {
        const inventoryItem = this.page.locator('[data-test="inventory-item"]');
        const inventoryPrice = this.page.locator('[data-test="inventory-item-price"]');

        const cartHeader = this.page.locator('[data-test="secondary-header"]');
        await this.page.click('[data-test="shopping-cart-link"]');

        await expect(inventoryItem).toBeVisible();
        await expect(inventoryPrice).toBeVisible();
        await expect(cartHeader).toBeVisible();
        await expect(this.page).toHaveURL(/cart.html/);
    }

    async verifyProductInCart(expectedName: string, expectedPrice: string) {
        const cartName = await this.page.textContent('.inventory_item_name');
        const cartPrice = await this.page.textContent('.inventory_item_price');

        expect(cartName).toBe(expectedName);
        expect(cartPrice).toBe(expectedPrice);
    }

    async completeCheckout() {
        await this.page.click('[data-test="checkout"]');

        await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

        await this.page.fill('[data-test="firstName"]', testData.checkoutInfo.firstName);
        await this.page.fill('[data-test="lastName"]', testData.checkoutInfo.lastName);
        await this.page.fill('[data-test="postalCode"]', testData.checkoutInfo.postalCode);
        await expect(this.page).toHaveURL(/checkout-step-one.html/);

        await this.page.click('[data-test="continue"]');
    }

    async checkoutOverview(expectedName: string, expectedPrice: string) {
        const cartName = await this.page.textContent('.inventory_item_name');
        const cartPrice = await this.page.textContent('.inventory_item_price');
        const subTotalPrice = await this.page.locator('[data-test="subtotal-label"]').textContent();

        await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

        await this.verifyProductInCart(expectedName, expectedPrice);

        expect(cartName).toBe(expectedName);
        expect(cartPrice).toBe(expectedPrice);
        expect(subTotalPrice).toBe('Item total: ' + expectedPrice);
        await expect(this.page).toHaveURL(/checkout-step-two.html/);
    }

    async completedCheckout() {
        await this.page.click('[data-test="finish"]');

        const title = this.page.locator('[data-test="title"]');
        await expect(title)
            .toHaveText('Checkout: Complete!');
        await expect(title)
            .toBeVisible();

        const completeHeader = this.page.locator('[data-test="complete-header"]');
        await expect(completeHeader)
            .toHaveText('Thank you for your order!');
        await expect(completeHeader)
            .toBeVisible();

        const completeText = this.page.locator('[data-test="complete-text"]');
        await expect(completeText)
            .toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(completeText)
            .toBeVisible();
        await expect(this.page).toHaveURL(/checkout-complete.html/);
    }

    async incompleteCheckout() {

        await this.page.click('[data-test="checkout"]');
        await this.page.fill('[data-test="firstName"]', testData.checkoutInfo.firstName);
        await this.page.fill('[data-test="lastName"]', testData.checkoutInfo.lastName);
        await this.page.click('[data-test="continue"]')
        
        await this.page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: Postal Code is required' }).nth(2)
        .isVisible() || (() => { throw new Error('❌ Error message not displayed for missing postal code'); })();

        await expect(this.page).toHaveURL(/checkout-step-one.html/);
        await this.page.locator('[data-test="error-button"]').click();
        await expect(
            this.page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: Postal Code is required' })
        ).not.toBeVisible();
        
        await this.page.fill('[data-test="postalCode"]', testData.checkoutInfo.postalCode);
        await this.page.click('[data-test="continue"]');

        await expect(this.page).toHaveURL(/checkout-step-two.html/);
    };
        
}