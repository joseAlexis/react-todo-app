import { Locator, Page } from "@playwright/test";

export default class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByTestId("auth-email-input");
    this.password = page.getByTestId("auth-password-input");
    this.submitButton = page.getByTestId("auth-submit-button");
  }

  async goto() {
    await this.page.goto("/#");
  }

  async authenticate(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}
