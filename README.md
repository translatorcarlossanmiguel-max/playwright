# playwright
QA Automation Engineer Challenge - Moveo. Candidate: Carlos San Miguel

# Playwright E2E Tests

This repository contains automated end-to-end (E2E) tests for [Your Project Name] using [Playwright](https://playwright.dev/).  
The tests cover login flows, checkout processes, and negative scenarios.

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies
Clone the repo and install dependencies with:

```bash
npm ci
// ⚡ Use npm ci instead of npm install to get a clean and reproducible setup.
2️⃣ Run Tests
Run all tests: npx playwright test

Run tests with UI (headed mode):
npx playwright test --headed

Run tests in a specific browser:
npx playwright test --project=chromium

3️⃣ View Reports
After running tests, open the HTML report:
npx playwright show-report
```

# Playwright Automation Project

## Instalación

```bash
npm ci
```

## Ejecutar todas las pruebas (modo headless por defecto)

```bash
npx playwright test
```

> **Nota:** Por configuración local, este comando abrirá el navegador (modo headed).  
> Para ejecutar las pruebas en modo headless (sin abrir el navegador), usa:

```bash
npx playwright test --headless
```

## Ejecutar todas las pruebas en modo headed (navegador visible)

```bash
npx playwright test --headed
```
O usando el script:
```bash
npm run test:headed
```
## Ejecutar un solo spec

```bash
npx playwright test ruta/al/archivo.spec.ts
```
Ejemplo:
```bash
npx playwright test tests/auth/login-success.spec.ts
```

## Depuración de pruebas

Para depurar una prueba y pausar en cada paso, usa:

```bash
npx playwright test --debug
```
Esto abrirá el navegador y la interfaz de Playwright Inspector para depuración interactiva.

## Notas

- Puedes cambiar la configuración de ejecución en `playwright.config.ts`.
- Los videos, screenshots y trazas se guardan solo en caso de fallo.

## 🛠️ Estabilización en CI

Para estabilizar la suite en CI:
- Se habilitan **screenshots**, **videos** y **trazas** solo en fallos (`screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`, `trace: 'retain-on-failure'`).
- Se usan **reintentos automáticos** (`retries`) para pruebas intermitentes.
- Puedes analizar fallos usando el **trace viewer** con:
  ```bash
  npx playwright show-trace trace.zip
  ```
- Ajusta el número de **workers** y el modo **headless** para entornos CI según recursos disponibles.

## Ejecutar manualmente el workflow en GitHub

1. Ve a la pestaña **Actions** de tu repositorio en GitHub.
2. Selecciona el workflow llamado **Playwright Tests**.
3. Haz clic en **Run workflow** (Ejecutar workflow) en la esquina superior derecha.
4. Elige la rama (por ejemplo, `main`) y haz clic en el botón para ejecutar el workflow manualmente.

Esto ejecutará las pruebas en CI usando la configuración definida en `.github/workflows/playwright.yml`.
