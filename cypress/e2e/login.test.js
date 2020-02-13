describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Logs In', () => {
    cy.findByLabelText(/email/i).type('seralma@gmail.com')
    cy.findByLabelText(/password/i).type('111111')
    cy.findByLabelText(/login button/i).click()
    cy.findByText(/Drivers/i).should('be.visible')
  })
})
