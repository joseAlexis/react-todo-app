import { Locator, Page } from "@playwright/test";
export default class TodosPage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("page-title");
  }
}
