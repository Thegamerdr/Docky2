describe('User Journey', () => {
  it('allows a user to browse perfumes, add to wishlist, and view wishlist', () => {
    // Visit the home page
    cy.visit('/')

    // Check if the hero search section is visible
    cy.get('h1').should('contain', 'Find Your Perfect Scent Match')

    // Navigate to the browse page
    cy.get('a[href="/browse"]').click()

    // Check if we're on the browse page
    cy.url().should('include', '/browse')
    cy.get('h1').should('contain', 'Browse Perfumes')

    // Select a perfume and add it to the wishlist
    cy.get('[data-testid="perfume-card"]').first().within(() => {
      cy.get('[data-testid="perfume-name"]').invoke('text').as('perfumeName')
      cy.get('button').contains('Select').click()
    })

    // Verify that a toast notification appears
    cy.get('[role="status"]').should('contain', 'Added to wishlist')

    // Navigate to the wishlist page
    cy.get('a[href="/wishlist"]').click()

    // Check if we're on the wishlist page
    cy.url().should('include', '/wishlist')
    cy.get('h1').should('contain', 'Your Wishlist')

    // Verify that the added perfume is in the wishlist
    cy.get('@perfumeName').then((perfumeName) => {
      cy.get('[data-testid="perfume-card"]').should('contain', perfumeName)
    })

    // Remove the perfume from the wishlist
    cy.get('[data-testid="perfume-card"]').first().within(() => {
      cy.get('button').contains('Remove from Wishlist').click()
    })

    // Verify that a toast notification appears
    cy.get('[role="status"]').should('contain', 'Removed from wishlist')

    // Verify that the wishlist is empty
    cy.get('[data-testid="perfume-card"]').should('not.exist')
    cy.contains('Your wishlist is empty.').should('be.visible')
  })
})

