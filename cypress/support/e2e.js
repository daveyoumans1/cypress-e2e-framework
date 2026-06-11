import './commands'

beforeEach(() => {
  cy.visit('about:blank')
  cy.clearAllCookies()
  cy.clearAllLocalStorage()
  cy.clearAllSessionStorage()
})
