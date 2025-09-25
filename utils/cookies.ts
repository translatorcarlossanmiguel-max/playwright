import { BrowserContext } from '@playwright/test';

/**
 * Returns the value of the 'session-username' cookie from the browser context.
 * @param context - The Playwright BrowserContext instance.
 * @returns The cookie object or undefined if not found.
 */
export async function getSessionUsernameCookie(context: BrowserContext) {
  const cookies = await context.cookies();
  return cookies.find(c => c.name === 'session-username');
}

// Usage example (uncomment to run standalone)
/*
async function exampleUsage() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const sessionCookie = await getSessionUsernameCookie(context);
  // You can use sessionCookie here
  await browser.close();
}

exampleUsage();
*/