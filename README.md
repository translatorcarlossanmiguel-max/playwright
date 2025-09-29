# Playwright
QA Automation Engineer Challenge - Moveo  
Candidate: Carlos San Miguel

# Playwright E2E Tests

This repository contains automated end-to-end (E2E) tests for [Your Project Name] using [Playwright](https://playwright.dev/).  
The tests cover login flows, checkout processes, and negative scenarios.

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies
Clone the repository and install dependencies with:

```bash
npm ci
```
> ⚡ Use `npm ci` instead of `npm install` for a clean and reproducible setup.

### 2️⃣ Environment Variables
Before running the tests, create a `.env` file in the root of the project and add any required environment variables.  
Check the project or ask the maintainer for the necessary keys and values.

### 3️⃣ Run Tests

Run all tests:
```bash
npx playwright test
```

Run tests with UI (headed mode):
```bash
npx playwright test --headed
```

Run tests in a specific browser:
```bash
npx playwright test --project=chromium
```

### 4️⃣ View Reports

After running tests, open the HTML report:
```bash
npx playwright show-report
```

# Playwright Automation Project

## Installation

```bash
npm ci
```

## Run All Tests (default: headless mode)

```bash
npx playwright test
```

> **Note:** By local configuration, this command will open the browser (headed mode).  
> To run tests in true headless mode (without opening the browser), use:

```bash
npx playwright test --headless
```

## Run All Tests in Headed Mode (visible browser)

```bash
npx playwright test --headed
```
Or using the script:
```bash
npm run test:headed
```

## Run a Single Spec

```bash
npx playwright test path/to/file.spec.ts
```
Example:
```bash
npx playwright test tests/auth/login-success.spec.ts
```

## Debugging Tests

To debug a test and pause at each step, use:

```bash
npx playwright test --debug
```
This will open the browser and the Playwright Inspector for interactive debugging.

## Notes

- You can change the execution settings in `playwright.config.ts`.
- Videos, screenshots, and traces are saved only in case of failure.

## 🛠️ Stabilizing in CI

To stabilize the suite in CI:
- **Screenshots**, **videos**, and **traces** are enabled only on failures (`screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`, `trace: 'retain-on-failure'`).
- **Automatic retries** (`retries`) are used for flaky tests.
- You can analyze failures using the **trace viewer** with:
  ```bash
  npx playwright show-trace trace.zip
  ```
- Adjust the number of **workers** and the **headless** mode for CI environments according to available resources.

## Running the Workflow Manually on GitHub

1. Go to the **Actions** tab in your GitHub repository.
2. Select the workflow named **Playwright Tests**.
3. Click on **Run workflow** in the top right corner.
4. Choose the branch (for example, `main`) and click the button to run the workflow manually.

This will run the tests in CI using the configuration defined in `.github/workflows/playwright.yml`.

---

## 🔄 CI/CD Workflow Triggers

- On the `main` branch: QA tests are automatically triggered on every push .
- On other branches: The workflow is triggered on the `dev` branch.

Make sure to check your `.github/workflows/playwright.yml` for the most up-to-date configuration.

---
