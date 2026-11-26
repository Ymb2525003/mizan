const { test, expect } = require('@playwright/test');

test('Next.js migration entry validates safely without changing planner data', async ({ page }) => {
  await page.goto('http://127.0.0.1:35561');
  await expect(page.getByRole('heading', { name: 'Plan the next true thing.' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Email address is required.')).toBeVisible();
  await expect(page.getByText('Password is required.')).toBeVisible();
  await expect(page.getByText(/does not create a session or change planner data/i)).toBeVisible();
  await page.getByLabel('Email address').fill('alex@example.com');
  await page.getByLabel('Password').fill('preview-only');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('status')).toContainText('Secure sign-in will be connected in a later milestone.');
});
