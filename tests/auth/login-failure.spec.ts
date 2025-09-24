import { test  } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Logeo defectuoso con credenciales bloqueadas', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginWithInvalidUser();

});
