const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

const appUrl = pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
async function openApp(page) {
  await page.addInitScript(() => {
    localStorage.setItem('lifepulse.auth.session.v1', JSON.stringify({ id: 'test', email: 'test@example.com', name: 'Test User' }));
  });
  await page.goto(appUrl);
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lifepulse.auth.session.v1', JSON.stringify({ id: 'test-user', email: 'test@example.com', name: 'Test User' })));
});

test('login validates fields and enters the dashboard in demo mode', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => Auth.signOut());
  await expect(page.locator('#auth-screen .auth-brand').getByText('Mizan', { exact: true })).toBeVisible();
  await expect(page.locator('.auth-logo img[src="assets/mizan-logo.svg"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Pick up where your day left off.' })).toBeVisible();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Email address is required.')).toBeVisible();
  await expect(page.getByText('Password is required.')).toBeVisible();
  await page.locator('#auth-email').fill('alex@example.com');
  await page.locator('#auth-password').fill('demo-password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('#auth-screen')).toBeHidden();
  await expect(page.locator('#sidebar .brand')).toContainText('Mizan');
  await expect(page.locator('#sidebar')).toContainText('alex@example.com');
});

test('planner task persists and can be completed', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await openApp(page);
  await page.locator('#sidebar [data-v="today"]').click();
  await page.locator('[data-plan="add-task"]').first().click();
  await page.locator('#plan-title').fill('Playwright test task');
  await page.locator('[data-act="modal-save"]').click();
  await expect(page.getByText('Playwright test task')).toBeVisible();
  await page.reload();
  await expect(page.getByText('Playwright test task')).toBeVisible();
  await page.getByRole('button', { name: 'Mark Playwright test task complete' }).click();
  await expect(page.getByRole('button', { name: 'Mark Playwright test task incomplete' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('calendar event persists after reload', async ({ page }) => {
  await openApp(page);
  await page.locator('#sidebar [data-v="calendar"]').click();
  await page.locator('[data-plan="add-event"]').click();
  await page.locator('#event-title').fill('Playwright calendar event');
  await page.locator('[data-act="modal-save"]').click();
  await expect(page.getByRole('button', { name: 'Playwright calendar event', exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Playwright calendar event', exact: true })).toBeVisible();
});

for (const width of [375, 768, 1440]) {
  test(`navigation renders at ${width}px in both themes`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await openApp(page);
    const views = ['today', 'week', 'calendar', 'tasks', 'habits', 'work', 'fitness', 'spirit', 'screen', 'expenses', 'debt', 'review', 'settings'];
    for (const theme of ['auto', 'dark']) {
      await page.evaluate(theme => setTheme(theme), theme);
      for (const view of views) {
        await page.evaluate(view => go(view), view);
        await expect(page.locator('#view')).not.toBeEmpty();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      }
    }
    expect(errors).toEqual([]);
  });
}

test('dark mode task form has readable colors', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => { setTheme('dark'); go('today'); });
  await expect(page.locator('#sidebar .nav-item.on')).toHaveCSS('color', 'rgb(9, 9, 10)');
  await page.locator('[data-plan="add-task"]').first().click();
  const colors = await page.locator('#plan-title').evaluate(el => ({ color: getComputedStyle(el).color, background: getComputedStyle(el).backgroundColor }));
  expect(colors.color).not.toBe(colors.background);
  expect(colors.background).not.toBe('rgb(255, 255, 255)');
});

test('destructive planner actions confirm and dialogs retain keyboard focus', async ({ page }) => {
  await openApp(page);
  await page.locator('[data-plan="add-task"]').first().click();
  await page.locator('#plan-title').fill('Confirm before deleting');
  await page.locator('[data-act="modal-save"]').click();
  await page.getByRole('button', { name: 'Delete Confirm before deleting' }).click();
  await expect(page.getByRole('dialog', { name: 'Delete task?' })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.locator('#modal-root')).toContainText('Delete task');
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByText('Confirm before deleting')).toBeVisible();
});

test('mobile rest timer clears the tab bar and disabled controls are non-interactive', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await openApp(page);
  await page.evaluate(() => {
    S.session = { rest: { end: Date.now() + 60000, total: 60 } };
    renderRest();
  });
  const boxes = await page.evaluate(() => {
    const rest = document.querySelector('#restbar').getBoundingClientRect();
    const tabs = document.querySelector('#tabbar').getBoundingClientRect();
    return { restBottom: rest.bottom, tabsTop: tabs.top };
  });
  expect(boxes.restBottom).toBeLessThanOrEqual(boxes.tabsTop);
  await page.evaluate(() => { S.session = null; go('habits'); });
  await expect(page.locator('[data-act="hab-week"][disabled]')).toBeDisabled();
});
