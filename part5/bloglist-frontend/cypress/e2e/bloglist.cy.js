describe('Bloglist', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Emma Smart',
      username: 'tester',
      password: 'sekret',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
  })
  it('Login form is shown', function () {
    cy.contains('log in').click()
    cy.contains('username')
  })

  describe('Login', function () {
    it('succeeds with the correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Emma Smart is logged in')
    })

    it('fails with wrong password', function () {
      cy.contains('log in').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })
})
