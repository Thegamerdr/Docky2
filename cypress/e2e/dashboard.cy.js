describe('Dashboard', () => {
  beforeEach(() => {
    // Mock the session
    cy.intercept('/api/auth/session', { fixture: 'session.json' })
    
    // Mock the perfumes API
    cy.intercept('/api/perfumes', { fixture: 'perfumes.json' })
    
    cy.visit('/dashboard')
  })

  it('displays the dashboard and perfumes', () => {
    cy.contains('h1', 'Perfume Marketplace Dashboard').should('be.visible')
    cy.get('[data-testid="perfume-card"]').should('have.length.at.least', 1)
  })

  it('allows searching for perfumes', () => {
    cy.get('input[placeholder="Search perfumes..."]').type('Chanel')
    cy.get('button').contains('Search').click()
    cy.get('[data-testid="perfume-card"]').should('contain', 'Chanel')
  })
})

