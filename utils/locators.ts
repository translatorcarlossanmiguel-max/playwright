export const LOCATORS = {
    login: {
        username: '[data-test="username"]',
        password: '[data-test="password"]',
        loginButton: '[data-test="login-button"]',
        errorMessage: '[data-test="error"]',

    },
    inventory: {
        list: '[data-test="inventory-list"]',
        item: '[data-test="inventory-item"]',
        itemName: '.inventory_item_name',
        itemPrice: '.inventory_item_price',
        addBackpack: '[data-test="add-to-cart-sauce-labs-backpack"]',
        removeButton: '[data-test="remove-sauce-labs-backpack"]',
        cartIcon: '.shopping_cart_link'
    },
    cart:{
        cartItem: '[data-test="inventory-item"]',
        cartPrice: '[data-test="inventory-item-price"]',
        cartHeader: '[data-test="secondary-header"]',
        cartLink: '[data-test="shopping-cart-link"]',
    },
    checkout: {
        checkoutButton: '[data-test="checkout"]',
        title: '[data-test="title"]',
        firstName: '[data-test="firstName"]',
        lastName: '[data-test="lastName"]',
        postalCode: '[data-test="postalCode"]',
        continueButton: '[data-test="continue"]',
        subtotalLabel: '[data-test="subtotal-label"]',
        finishButton: '[data-test="finish"]',
        completeHeader: '[data-test="complete-header"]',
        completeText: '[data-test="complete-text"]',
        checkoutInfoContainer: '[data-test="checkout-info-container"] div',
        errorButton: '[data-test="error-button"]'
    }
};


// Checkout locators

// '[data-test="finish"]'
// '[data-test="complete-header"]'
// '[data-test="complete-text"]'
// '[data-test="checkout-info-container"] div'
// '[data-test="error-button"]'