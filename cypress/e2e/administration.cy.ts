///<reference types="cypress" />

describe('Administration page functionality testing', () => {
    beforeEach(() => {
        localStorage.clear();
        cy.visit('/admin');
    });
    it('Delete a catalog item from the catalog', () => {
        const firstItem = cy.get('[data-testid="admin-item"]').first().should('exist');
        cy.get('[data-testid="item-delete"]').first().click();
        firstItem.should('not.exist');
    });
});
