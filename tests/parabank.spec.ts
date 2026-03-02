import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../Page/Login.spec';

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
  browser = await chromium.launch({  }); 
  context = await browser.newContext();
  page = await context.newPage();

  const login = new LoginPage(page);
  await login.gotoUrl();
});

test('Registration', async () => {
  await page.getByRole('link', { name: 'Register' }).click();

  await page.locator('input[id="customer.firstName"]').fill('Estrella');
  await page.locator('input[id="customer.lastName"]').fill('Singh');
  await page.locator('input[id="customer.address.street"]').fill('Chakeri Kanpur');
  await page.locator('input[id="customer.address.city"]').fill('Kanpur');
  await page.locator('input[id="customer.address.state"]').fill('Uttar Pradesh');
  await page.locator('input[id="customer.address.zipCode"]').fill('208007');
  await page.locator('input[id="customer.phoneNumber"]').fill('1234567899');
  await page.locator('input[id="customer.ssn"]').fill('454545');
  await page.locator('input[id="customer.username"]').fill('EstrellaSingh1');
  await page.locator('input[id="customer.password"]').fill('Estrella@1234');
  await page.locator('input[id="repeatedPassword"]').fill('Estrella@1234');

  await page.getByRole('button', { name: 'Register' }).click();
});

test('Open Account', async () => {
  const login = new LoginPage(page);
  await login.gotoLogin('EstrellaSingh1', 'Estrella@1234');
  await page.getByRole('link', { name: 'Open New Account' }).click();
  await page.locator('select[id="type"]').selectOption('CHECKING');
  await page.selectOption('select[id="fromAccountId"]', { index: 0 });
  await page.getByRole('button', { name: 'Open New Account' }).click();
 const msg = await page.getByText('Congratulations, your account is now open.');
  await expect(msg).toBeVisible();
});

test('Bill Pay', async () => {
  const login = new LoginPage(page);
  await login.gotoLogin('EstrellaSingh1', 'Estrella@1234');

  await page.getByRole('link', { name: 'Bill Pay' }).click();
  await page.locator('input[name="payee.name"]').fill('Sunny');
  await page.locator('input[name="payee.address.street"]').fill('Puri Odisha');
  await page.locator('input[name="payee.address.city"]').fill('Gurgaon');
  await page.locator('input[name="payee.address.state"]').fill('Haryana');
  await page.locator('input[name="payee.address.zipCode"]').fill('208008');
  await page.locator('input[name="payee.phoneNumber"]').fill('12345678');
  await page.locator('input[name="payee.accountNumber"]').fill('100000');
  await page.locator('input[name="verifyAccount"]').fill('100000');
  await page.locator('input[name="amount"]').fill('100000');

  await page.locator('input[value="Send Payment"]').click();
  await expect(page.getByRole('heading', { name: 'Bill Payment Complete' })).toBeVisible();
});

test('Transfer Funds', async () => {
  const login = new LoginPage(page);
  await login.gotoLogin('EstrellaSingh1', 'Estrella@1234');

  await page.getByRole('link', { name: 'Transfer Funds' }).click();
  await page.locator('input[name="input"]').fill('12000');
  await page.selectOption('select[id="toAccountId"]', { index: 1 });
  await page.locator('input[type="submit"]').click();
  await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
});