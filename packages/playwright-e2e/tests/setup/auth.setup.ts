import { test as setup, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authFile = path.join(__dirname, "../../.auth/user.json");

setup("authenticate", async ({ page }) => {
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;

  page.goto("/#");

  const title = page.getByTestId("page-title");
  const usernameField = page.getByTestId("auth-email-input");
  const passwordField = page.getByTestId("auth-password-input");
  const loginButton = page.getByTestId("auth-submit-button");

  await usernameField.fill(username);
  await passwordField.fill(password);
  await loginButton.click();

  await expect(title).toBeVisible();
  await expect(title).toHaveText("Todos");

  await page.context().storageState({ path: authFile });
});
