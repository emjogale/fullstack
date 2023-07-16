describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Emma Smart',
      username: 'tester',
      password: 'sekret',
    }

    const user2 = {
      name: 'Maureen Blunt',
      username: 'bunty',
      password: 'bigSekret',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
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

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'All about Elvis',
          author: 'Elvana',
          likes: 2,
          url: 'testurl2',
        })
        cy.createBlog({
          title: 'Top ten mops',
          author: 'Mr Clean',
          likes: 1,
          url: 'testurl3',
        })
        cy.createBlog({
          title: 'How to win the lottery',
          author: 'Money Spider',
          likes: 150,
          url: 'testurl4',
        })
      })

      it('a like can be added', function () {
        cy.contains('All about Elvis Elvana').contains('view').click()
        cy.contains('likes 2')
        cy.contains('All about Elvis Elvana')
          .siblings()
          .contains('like')
          .click()

        cy.contains('likes 3')
      })

      it('a blog can be deleted by the user who created it', function () {
        cy.contains('All about Elvis Elvana').contains('view').click()
        cy.contains('All about Elvis Elvana')
          .siblings()
          .contains('delete')
          .click()

        cy.contains('All about Elvis Elvana').should('not.exist')
      })

      it('only the creator of the blog can see the delete button', function () {
        cy.contains('view').click()

        cy.contains('logout').click()
        cy.login({ username: 'bunty', password: 'bigSekret' })
        cy.contains('view').click()
        cy.contains('delete').should('not.exist')
      })

      it('blogs are ordered in descending order of likes', function () {
        cy.get('.blog').eq(0).should('contain', 'How to win the lottery')
        cy.get('.blog').eq(1).should('contain', 'All about Elvis')

        cy.contains('Top ten mops').contains('view').click()
        cy.contains('Top ten mops').siblings().contains('like').click()
        cy.contains('Top ten mops').siblings().contains('like').click()

        cy.get('.blog').eq(1).should('contain', 'Top ten mops')
      })
    })
  })
})
