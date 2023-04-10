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
    it('Save changes button saves catalog content state', () => {
        const firstText = cy.get('[data-testid="item-name"]').first().invoke('text');
        cy.get('[data-testid="item-delete"]').first().click();
        cy.get('[data-testid="save-changes-btn"').click();
        cy.visit('/catalog');
        cy.visit('/admin');
        const secondText = cy.get('[data-testid="item-name"]').first().invoke('text');
        firstText.should('not.eq', secondText);
    });
});
