import './commands'

beforeEach(() => {
  // Stub third-party requests that can block the load event in CI
  cy.intercept(/google-analytics\.com|googletagmanager\.com|fonts\.googleapis\.com|fonts\.gstatic\.com/, {
    statusCode: 200,
    body: '',
  })

  cy.window().then((win) => {
    if (win.navigator && win.navigator.serviceWorker) {
      return win.navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => Promise.all(registrations.map((r) => r.unregister())))
        .catch(() => {})
    }
  })
})
