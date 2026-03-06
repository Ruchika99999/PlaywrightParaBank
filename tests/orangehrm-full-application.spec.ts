import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Full Application Automation', () => {
  test('Automate all major modules', async ({ page }) => {
    // 1. Open the OrangeHRM demo site
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // 2. Login
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button:has-text("Login")');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // 3. Navigate to PIM module and verify Employee List
    await page.getByRole('link', { name: 'PIM' }).click();
    await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();

    // 4. Add a new employee
    await page.click('button:has-text("Add")');
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.click('button:has-text("Save")');

    // 5. Navigate to Admin module and verify Admin page
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();

    // 6. Navigate to Leave module and apply for leave
    await page.getByRole('link', { name: 'Leave' }).click();
    await page.click('button:has-text("Apply")');
    await page.selectOption('select[name="leaveType"]', 'Annual Leave');
    await page.fill('input[name="fromDate"]', '2026-03-10');
    await page.fill('input[name="toDate"]', '2026-03-12');
    await page.click('button:has-text("Apply")');

    // 7. Logout
    await page.click('button:has-text("Logout")');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});