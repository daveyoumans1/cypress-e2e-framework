import './commands'

beforeEach(() => {
  cy.clearAllServiceWorkers()
  cy.clearAllCookies()
  cy.clearAllLocalStorage()
  cy.clearAllSessionStorage()
})
