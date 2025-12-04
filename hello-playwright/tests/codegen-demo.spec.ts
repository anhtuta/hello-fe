import { test, expect } from '@playwright/test';

// This code was generated using the Playwright Test Codegen
test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  await page.getByRole('heading', { name: 'todos' }).click();
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('todos');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeEmpty();
});