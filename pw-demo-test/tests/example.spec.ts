import { test, expect, mergeTests, chromium } from '@playwright/test';

test.skip('has title (skipped)', async ({ page }) => { // skip this test
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('has title', async ({ page }) => { // skip this test
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.only('get started link', async ({ page }) => { //execute only this test
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


// CLI commands to run tests:
// npx playwright test - run all tests
// npx playwright test --project=chromium - run only on chromium
// npx playwright test -g "has title" - run a single test by name
// npx playwright show-report - serve report after test run
// npx playwright test --ui - run plawright UI editor
// npx playwright test --debug - run plawright UI debugger
