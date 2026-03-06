import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Demo Site', () => {
  test('Automate login and dashboard navigation', async ({ page }) => {
    // 1. Open the OrangeHRM demo site
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // 2. Verify that the dashboard page loads successfully
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // 3. Navigate to the 'PIM' module
    await page.getByRole('link', { name: 'PIM' }).click();

    // 4. Confirm the Employee List is visible
    await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();

    // 5. Take screenshots of the dashboard and employee list pages
    await page.screenshot({ path: 'dashboard-screenshot.png' });
    await page.screenshot({ path: 'employee-list-screenshot.png' });
  });
});