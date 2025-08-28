/// <reference types="cypress" />

describe('ArticlesTable E2E', () => {
  beforeEach(() => {
    cy.fixture('user.json').then((user) => {
      cy.visit('http://localhost:5173/login')

      cy.get('[data-testid="username-input"]').type(user.username)
      cy.get('[data-testid="password-input"]').type(user.password)
      cy.get('[data-testid="login-button"]').click()

      cy.url().should('eq', 'http://localhost:5173/')
    })
  })

  it('renders articles and search input', () => {
    cy.get('[data-testid="search-input"]').should('exist')
    cy.contains('ID').should('exist')
    cy.contains('Nombre').should('exist')

    cy.get('[data-testid="article-row"]', { timeout: 10000 })
      .should('exist')
      .and('have.length.greaterThan', 0)
  })

  it('filters articles by search', () => {
    cy.get('[data-testid="search-input"]').type('Argentina')
    cy.get('[data-testid="article-row"]').each(($el) => {
      cy.wrap($el)
        .find('[data-testid="article-country"]')
        .contains(/Argentina/i)
      cy.wrap($el).find('[data-testid="article-name"]').should('exist')
    })
  })

  it('filters articles by status', () => {
    cy.get('[data-testid="status-filter"]').click()
    cy.get('li').contains('Válido').click()
    cy.get('[data-testid="article-row"]').each(($el) => {
      cy.wrap($el).find('[data-testid="article-status"]').contains('Válido')
    })
  })

  it('sorts articles by date and amount', () => {
    cy.get('[data-testid="sort-date"]').click()
    cy.get('[data-testid="sort-amount"]').click()
  })
})
