import { EMAIL, PASSWORD } from "../const/editInformation";

describe("Login", function () {
  beforeEach(function () {
    cy.visit(Cypress.env("baseUrl"));
    cy.wait(10000);
    cy.get(".panel > .header > .authorization-link > a", {
      setTimeout: 60000,
    }).click({ force: true });
    cy.wait(10000);
    cy.get("#email", {
      setTimeout: 60000,
    }).type(EMAIL);
    cy.wait(500).get("#pass").type(PASSWORD);
    cy.wait(500).get("#send2").click("center").should("be.visible");
    cy.visit(Cypress.env("baseUrl") + "/customer/account");
    cy.visit(
      "https://magento.softwaretestingboard.com/customer/account/edit/]"
    );
    cy.wait(7000);
  });

  afterEach(function () {
    cy.clearCookies();
    cy.wait(7000);
  });

  it("Edit Information", function () {
    cy.get("#firstname").clear().type("testing123");
    cy.get("#lastname").clear().type("minminmin");
    cy.get("#form-validate > .actions-toolbar > div.primary > .action")
      .contains("Save")
      .click();
  });

  it("Invalid Edit Information - Null fields", function () {
    cy.get("#firstname").clear();
    cy.get("#lastname").clear();
    cy.get("#form-validate > .actions-toolbar > div.primary > .action")
      .contains("Save")
      .click();
    cy.get("#firstname-error")
      .should("be.visible")
      .should("have.text", "This is a required field.");
    cy.get("#lastname-error")
      .should("be.visible")
      .should("have.text", "This is a required field.");
  });

  it("Invalid Edit Information - Null lastname fields", function () {
    cy.get("#firstname").clear().type("testing");
    cy.get("#lastname").clear();
    cy.get("#form-validate > .actions-toolbar > div.primary > .action")
      .contains("Save")
      .click();
    cy.get("#lastname-error")
      .should("be.visible")
      .should("have.text", "This is a required field.");
  });

  it("Invalid Edit Information - Null firstname fields", function () {
    cy.get("#firstname").clear();
    cy.get("#lastname").clear().type("testingminmin");
    cy.get("#form-validate > .actions-toolbar > div.primary > .action")
      .contains("Save")
      .click();
    cy.get("#firstname-error")
      .should("be.visible")
      .should("have.text", "This is a required field.");
  });
});
