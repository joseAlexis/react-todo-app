import { test as setup, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";
import LoginPage from "../../page-objects/pages/login.page";
import TodosPage from "../../page-objects/pages/todos.page";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authFile = path.join(__dirname, "../../.auth/user.json");

setup("authenticate", async ({ page }) => {
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;

  const loginPage = new LoginPage(page);
  const todosPage = new TodosPage(page);
  
  await loginPage.goto();
  await loginPage.authenticate(username, password);

  await expect(todosPage.title).toBeVisible();
  await expect(todosPage.title).toHaveText("Todos");

  await page.context().storageState({ path: authFile });
});
