import { Page, expect } from '@playwright/test';
import testData from '../utils/test-data.json';
import { LOCATORS } from '../utils/locators';

export class PurchasePage {
    private productName: string | undefined;
    private productPrice: string | undefined;

    constructor(private page: Page) {

    }

    async inventoryPage() {
        await this.page.goto('/inventory.html');
    }
    async checkoutPage() {
        await this.page.goto('/checkout-step-one.html');
    }

    async buyProduct() {

        const { list, item, itemName } = LOCATORS.inventory;

        // 2. Scope to the inventory list inside the container
        const listLocator = this.page.locator(list);

        // 3. Find all items inside the inventory list
        const items = listLocator.locator(item);

        // 5. Count items
        const count = await items.count();
        if (count === 0) throw new Error('No items found');

        // 6. Pick a random item
        const randomIndex = Math.floor(Math.random() * count);
        const randomItem = items.nth(randomIndex);

        await randomItem.scrollIntoViewIfNeeded();

        this.productName = (await randomItem.locator(itemName).textContent())?.trim();
        this.productPrice = (await randomItem.locator(LOCATORS.inventory.itemPrice).textContent())?.trim();
        // 7. Get the product name from the random item
        const productName = await randomItem.locator(itemName).textContent();
        const productPrice = await randomItem.locator(LOCATORS.inventory.itemPrice).textContent();

        const pricebarButton = randomItem.locator(LOCATORS.inventory.addItem);
        await pricebarButton.click();


        console.log('Random product name:', productName);
        console.log('Random product price:', productPrice);
        await this.page.click(LOCATORS.inventory.cartIcon);

    }

    async goToCart() {
        await expect(this.page).toHaveURL(/cart.html/);
        const inventoryItem = this.page.locator(LOCATORS.inventory.itemName);
        const itemNameText = await inventoryItem.textContent();
        expect(itemNameText?.trim()).toBe(this.productName);

        const inventoryPrice = this.page.locator(LOCATORS.inventory.itemPrice);
        const cartItemLocator = this.page.locator(LOCATORS.inventory.itemName)

        // Get its text content
        const cartItemTextRaw = await cartItemLocator.textContent();
        if (cartItemTextRaw === null) {
            throw new Error('Cart item text content is null');
        }
        const cartItemText = cartItemTextRaw.trim();

        // Now compare the cart item's text to the stored product name
        expect(cartItemText).toBe(this.productName);

        const cartHeader = this.page.locator(LOCATORS.cart.header);

        // Obtén el texto del nombre del producto en el carrito y compáralo con el esperado
        const cartItemName = await this.page.locator(LOCATORS.inventory.itemName).textContent();
        expect(cartItemName?.trim()).toBe(this.productName);

        await expect(inventoryItem).toBeVisible();
        await expect(inventoryPrice).toBeVisible();
        await expect(cartHeader).toBeVisible();
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
        const cartName = await this.page.textContent(LOCATORS.inventory.itemName);
        const cartPrice = await this.page.textContent(LOCATORS.inventory.itemPrice);
        const totalPrice = await this.page.textContent(LOCATORS.checkout.totalLabel);
        const taxText = await this.page.textContent(LOCATORS.checkout.tax);

        await expect(this.page.locator(LOCATORS.checkout.title)).toHaveText('Checkout: Overview');

        expect(cartName).toBe(expectedName);
        expect(cartPrice).toBe(expectedPrice);

        // Nueva lógica para comparar el tax
        this.expectTaxMatches(totalPrice, expectedPrice, taxText);

        console.log('Expected Name:', expectedName);
        console.log('Expected Price:', expectedPrice);
        console.log('Total Price:', totalPrice);
        console.log(taxText);

        await expect(this.page).toHaveURL(/checkout-step-two.html/);
    }

    private expectTaxMatches(totalPrice: string | null, expectedPrice: string | null, taxText: string | null) {
        if (!totalPrice || !expectedPrice || !taxText) {
            throw new Error('Total price, expected price, or tax is missing');
        }
        const total = parseFloat(totalPrice.replace(/[^0-9.]/g, ''));
        const expected = parseFloat(expectedPrice.replace(/[^0-9.]/g, ''));
        const tax = parseFloat(taxText.replace(/[^0-9.]/g, ''));
        const diff = +(total - expected).toFixed(2);
        expect(diff).toBeCloseTo(tax, 2);
    }

    async completedCheckout() {
        await this.page.click(LOCATORS.checkout.finishButton);

        await expect(this.page).toHaveURL(/checkout-complete.html/);

        await expect(this.page.locator(LOCATORS.checkout.title))
            .toBeVisible();
        await expect(this.page.locator(LOCATORS.checkout.title))
            .toHaveText('Checkout: Complete!');


        await expect(this.page.locator(LOCATORS.checkout.completeHeader)).toBeVisible();
        await expect(this.page.locator(LOCATORS.checkout.completeHeader)).toHaveText('Thank you for your order!');

        await expect(this.page.locator(LOCATORS.checkout.dispatchedText)).  toBeVisible();
        await expect(this.page.locator(LOCATORS.checkout.dispatchedText))
            .toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

        await expect(this.page.locator(LOCATORS.checkout.image))
            .toBeVisible();

        await expect(this.page.locator(LOCATORS.checkout.backHomeButton)).toBeVisible();

    }

    async incompleteCheckout() {
        await this.page.fill(LOCATORS.checkout.firstName, testData.checkoutInfo.firstName);
        await this.page.fill(LOCATORS.checkout.lastName, testData.checkoutInfo.lastName);
        await this.page.click(LOCATORS.checkout.continueButton);

        await expect(
            this.page.locator(LOCATORS.checkout.errorMessage, { hasText: 'Error: Postal Code is required' })
        ).toBeVisible();

        await expect(this.page).toHaveURL(/checkout-step-one.html/);
        await this.page.locator(LOCATORS.checkout.errorButton).click();

        await expect(
            this.page.locator(LOCATORS.checkout.errorMessage)
        ).not.toBeVisible();

        await this.page.fill(LOCATORS.checkout.postalCode, testData.checkoutInfo.postalCode);
        await this.page.click(LOCATORS.checkout.continueButton);

        await expect(this.page).toHaveURL(/checkout-step-two.html/);
    };
}

