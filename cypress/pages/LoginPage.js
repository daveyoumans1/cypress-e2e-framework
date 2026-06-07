class LoginPage {
  get usernameInput() { return cy.get('[data-test="username"]') }
  get passwordInput() { return cy.get('[data-test="password"]') }
  get loginButton()   { return cy.get('[data-test="login-button"]') }
  get errorMessage()  { return cy.get('[data-test="error"]') }

  visit() {
    cy.visit('/')
    return this
  }

  login(username, password) {
    this.usernameInput.clear().type(username)
    this.passwordInput.clear().type(password)
    this.loginButton.click()
    return this
  }

  assertErrorContains(text) {
    this.errorMessage.should('be.visible').and('contain.text', text)
  }

  assertNoError() {
    this.errorMessage.should('not.exist')
  }
}

export default new LoginPage()
