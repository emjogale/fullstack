describe('Bloglist', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Emma Smart',
      username: 'tester',
      password: 'sekret',
    }
    cy.visit('http://localhost:3000')
  })
  it('login button is displayed by default', function () {
    cy.contains('log in')
  })
})
