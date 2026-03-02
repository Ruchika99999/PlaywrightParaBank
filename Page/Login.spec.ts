import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoUrl() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
  }

  async gotoLogin(username: string, password: string) {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.locator('input[value="Log In"]').click();
  }
}