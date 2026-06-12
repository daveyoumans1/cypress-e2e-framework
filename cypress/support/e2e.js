import './commands'

beforeEach(() => {
  cy.window().then((win) => {
    if (win.navigator && win.navigator.serviceWorker) {
      return win.navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => Promise.all(registrations.map((r) => r.unregister())))
        .catch(() => {})
    }
  })
  cy.clearAllCookies()
  cy.clearAllLocalStorage()
  cy.clearAllSessionStorage()
})
