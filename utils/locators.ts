export const LOCATORS = {
    login: {
        username: '#user-name',
        password: '#password',
        loginButton: '#login-button',
        errorMessage: '[data-test="error"]',
    },
    inventory: {
        mainInventory: 'main #inventory_container',
        list: '[data-test="inventory-list"]',
        item: '[data-test="inventory-item"]',
        itemName: '.inventory_item_name',
        itemPrice: '.inventory_item_price',
        addItem: '.pricebar button',
        removeButton: '[data-test="remove-sauce-labs-backpack"]',
        cartIcon: '.shopping_cart_link'
    },
    cart: {
        cartItem: '[data-test="inventory-item"]',
        cartPrice: '[data-test="inventory-item-price"]',
        header: '[data-test="secondary-header"]',
        cartLink: '[data-test="shopping-cart-link"]',
    },
    checkout: {
        checkoutButton: '[data-test="checkout"]',
        title: '[data-test="title"]',
        firstName: '#first-name',
        lastName: '#last-name',
        postalCode: '#postal-code',
        continueButton: '#continue',
        subtotalLabel: '[data-test="subtotal-label"]',
        totalLabel: '[data-test="total-label"]',
        finishButton: '[data-test="finish"]',
        completeHeader: '[data-test="complete-header"]',
        dispatchedText: '[data-test="complete-text"]',
        checkoutInfoContainer: '[data-test="checkout-info-container"] div',
        errorButton: '[data-test="error-button"]',
        errorMessage: '[data-test="error"]',
        tax: '[data-test="tax-label"]',
        image: '[data-test="pony-express"]',
        backHomeButton: '#back-to-products'
    }
};