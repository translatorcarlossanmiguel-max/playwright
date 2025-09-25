import { Page, expect } from '@playwright/test';
import testData from '../utils/test-data.json';
import { LOCATORS } from '../utils/locators';

export class PurchasePage {
    constructor(private page: Page) { }

    async inventoryPage() {
        await this.page.goto('/inventory.html');
    }

    async buyProduct(productName: string) {

        const productLocator = this.page.locator(LOCATORS.inventory.list)
            .filter({ hasText: productName });

        const name = await productLocator.locator(LOCATORS.inventory.itemName).textContent();
        const price = await productLocator.locator(LOCATORS.inventory.itemPrice).textContent();

        const removeButton = this.page.locator(LOCATORS.inventory.removeButton);

        await this.page.click(LOCATORS.inventory.addBackpack);
        await expect(removeButton).toBeVisible();

        return { name, price };
    }

    async goToCart() {
        const inventoryItem = this.page.locator(LOCATORS.inventory.item);
        const inventoryPrice = this.page.locator(LOCATORS.inventory.itemPrice);

        const cartHeader = this.page.locator(LOCATORS.cart.header);
        await this.page.click(LOCATORS.inventory.cartIcon);

        await expect(inventoryItem).toBeVisible();
        await expect(inventoryPrice).toBeVisible();
        await expect(cartHeader).toBeVisible();
        await expect(this.page).toHaveURL(/cart.html/);
    }

    async verifyProductInCart(expectedName: string, expectedPrice: string) {
        const cartName = await this.page.textContent(LOCATORS.cart.cartItem);
        const cartPrice = await this.page.textContent(LOCATORS.cart.cartPrice);

        expect(cartName).toBe(expectedName);
        expect(cartPrice).toBe(expectedPrice);
    }

    async completeCheckout() {
        await this.page.click(LOCATORS.checkout.checkoutButton);

        await expect(this.page.locator(LOCATORS.checkout.title)).toHaveText('Checkout: Your Information');

        await this.page.fill(LOCATORS.checkout.firstName, testData.checkoutInfo.firstName);
        await this.page.fill(LOCATORS.checkout.lastName, testData.checkoutInfo.lastName);
        await this.page.fill(LOCATORS.checkout.postalCode, testData.checkoutInfo.postalCode);
        await expect(this.page).toHaveURL(/checkout-step-one.html/);

        await this.page.click(LOCATORS.checkout.continueButton);
    }

    async checkoutOverview(expectedName: string, expectedPrice: string) {
        const cartName = await this.page.textContent(LOCATORS.cart.cartItem);
        const cartPrice = await this.page.textContent(LOCATORS.cart.cartPrice);
        const subTotalPrice = await this.page.locator(LOCATORS.checkout.subtotalLabel).textContent();

        await expect(this.page.locator(LOCATORS.checkout.title)).toHaveText('Checkout: Overview');

        await this.verifyProductInCart(expectedName, expectedPrice);

        expect(cartName).toBe(expectedName);
        expect(cartPrice).toBe(expectedPrice);
        expect(subTotalPrice).toBe('Item total: ' + expectedPrice);
        await expect(this.page).toHaveURL(/checkout-step-two.html/);
    }

    async completedCheckout() {
        await this.page.click(LOCATORS.checkout.finishButton);

        const title = this.page.locator(LOCATORS.checkout.title);
        await expect(title)
            .toHaveText('Checkout: Complete!');
        await expect(title)
            .toBeVisible();

        const completeHeader = this.page.locator(LOCATORS.checkout.completeHeader);
        await expect(completeHeader)
            .toHaveText('Thank you for your order!');
        await expect(completeHeader)
            .toBeVisible();

        const completeText = this.page.locator(LOCATORS.checkout.completeText);
        await expect(completeText)
            .toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(completeText)
            .toBeVisible();
        await expect(this.page).toHaveURL(/checkout-complete.html/);
    }

    async incompleteCheckout() {

        await this.page.click(LOCATORS.checkout.checkoutButton);
        await this.page.fill(LOCATORS.checkout.firstName, testData.checkoutInfo.firstName);
        await this.page.fill(LOCATORS.checkout.lastName, testData.checkoutInfo.lastName);
        await this.page.click(LOCATORS.checkout.continueButton);

        await this.page.locator(LOCATORS.checkout.checkoutInfoContainer).filter({ hasText: 'Error: Postal Code is required' })
            .isVisible() || (() => { throw new Error('❌ Error message not displayed for missing postal code'); })();

        await expect(this.page).toHaveURL(/checkout-step-one.html/);
        await this.page.locator(LOCATORS.checkout.errorButton).click();
        await expect(
            this.page.locator(LOCATORS.checkout.checkoutInfoContainer).filter({ hasText: 'Error: Postal Code is required' })
        ).not.toBeVisible();

        await this.page.fill(LOCATORS.checkout.postalCode, testData.checkoutInfo.postalCode);
        await this.page.click(LOCATORS.checkout.continueButton);

        await expect(this.page).toHaveURL(/checkout-step-two.html/);
    };
}

