import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Full Application Automation', () => {
  test('Automate all major modules', async ({ page }) => {
    test.setTimeout(120000); 

    // 1. Open the OrangeHRM demo site
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Login
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // 3. Navigate to PIM module and verify Employee List
    await page.getByRole('link', { name: 'PIM' }).click();
    await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();

    // 4. Add a new employee
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByRole('button', { name: 'Save' }).click();

    // 5. Navigate to Admin module and verify Admin page
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();

   // 6. Navigate to Leave module and apply for leave
    await page.getByRole('link', { name: 'Leave' }).click();
    await page.getByRole('link', { name: 'Apply' }).click();


    // 7. Logout (via dropdown)
    await page.locator('span.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});
