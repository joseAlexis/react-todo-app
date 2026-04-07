describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/#");
  });

  it("Should login successfully with valid credentials", () => {
    cy.env(["username", "password"]).then(({username, password}) => {
      cy.getByTestId("auth-email-input").type(username);
      cy.getByTestId("auth-password-input").type(password);
      cy.getByTestId("auth-submit-button").click();

      cy.getByTestId("page-title")
        .should("be.visible")
        .and("have.text", "Todos");
      cy.getByTestId("view-todos-toggle-button").should("be.visible");
      cy.getByTestId("logout-button").should("be.visible");
    });
  });
});
