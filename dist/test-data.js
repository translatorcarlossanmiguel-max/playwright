"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
// Abrir navegador en modo head (no headless)
(async () => {
    const browser = await playwright_1.chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    // ...puedes agregar más acciones aquí...
    // await browser.close();
})();
