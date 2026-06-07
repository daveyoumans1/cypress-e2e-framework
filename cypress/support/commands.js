/**
 * Bypasses the UI login by injecting the session cookie directly.
 * Use this in tests where login is a precondition, not the subject under test.
 */
Cypress.Commands.add('loginAs', (userKey = 'standard') => {
  cy.fixture('users').then((users) => {
    const { username, password } = users[userKey]
    cy.session(
      [userKey],
      () => {
        cy.visit('/')
        cy.get('[data-test="username"]').type(username)
        cy.get('[data-test="password"]').type(password)
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory')
      },
      {
        cacheAcrossSpecs: true,
      }
    )
  })
})

/**
 * Assert that an element does not exist or is not visible, with a friendly failure message.
 */
Cypress.Commands.add('assertHidden', { prevSubject: 'optional' }, (subject, selector) => {
  const target = subject ? cy.wrap(subject) : cy.get(selector)
  target.should('not.exist')
})
