describe('Perfume List', () => {
  it('displays perfumes and allows filtering', () => {
    cy.visit('/')
    
    // Check if perfumes are displayed
    cy.get('[data-testid="perfume-card"]').should('have.length.gt', 0)
    
    // Test search functionality
    cy.get('[data-testid="search-input"]').type('Chanel')
    cy.get('[data-testid="search-button"]').click()
    
    // Check if results are filtered
    cy.get('[data-testid="perfume-card"]').each(($el) => {
      cy.wrap($el).should('contain.text', 'Chanel')
    })
  })
})

