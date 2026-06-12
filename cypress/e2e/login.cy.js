import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'

describe('Login', () => {
  beforeEach(() => {
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    LoginPage.visit()
  })

  it('allows standard user to log in', () => {
    LoginPage.login('standard_user', 'secret_sauce')
    cy.url().should('include', '/inventory')
    InventoryPage.assertLoaded()
  })

  it('blocks locked-out user with descriptive error', () => {
    LoginPage.login('locked_out_user', 'secret_sauce')
    LoginPage.assertErrorContains('locked out')
  })

  it('shows error for invalid credentials', () => {
    LoginPage.login('bad_user', 'bad_pass')
    LoginPage.assertErrorContains('Username and password do not match')
  })

  context('empty fields', () => {
    const cases = [
      { label: 'empty username', username: '', password: 'secret_sauce', error: 'Username is required' },
      { label: 'empty password', username: 'standard_user', password: '', error: 'Password is required' },
    ]

    cases.forEach(({ label, username, password, error }) => {
      it(`shows error for ${label}`, () => {
        LoginPage.login(username, password)
        LoginPage.assertErrorContains(error)
      })
    })
  })
})
