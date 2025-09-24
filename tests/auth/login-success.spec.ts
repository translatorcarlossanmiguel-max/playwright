import { test  } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Logeo exitoso con credenciales válidas', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginWithValidUser();
  
  // ...verificaciones de login exitoso...
 // await expect(page).toHaveURL(/.*dashboard/);
});
