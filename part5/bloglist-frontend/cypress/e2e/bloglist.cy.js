describe('Blog app', function () {
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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester', password: 'sekret' })
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('Tennis tips')
      cy.get('#author-input').type('John McEnroe')
      cy.get('#url-input').type('test-url')
      cy.get('#create').click()

      cy.contains('Tennis tips John McEnroe')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'All about Elvis',
          author: 'Elvana',
          url: 'testurl2',
        })
      })
      it('a like can be added', function () {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()

        cy.contains('likes 1')
      })
    })
  })
})
