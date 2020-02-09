/// <reference types="Cypress" />

describe('Accessibility checks', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
  })
  it('Has no detectable a11y violations on load', () => {
    cy.checkA11y()
  })
})
