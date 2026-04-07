declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select an element by its data-testid attribute.
     * @example cy.getByTestId('submit-button')
     */
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add("getByTestId", (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});
