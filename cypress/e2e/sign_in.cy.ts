describe('Sign-In Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/sign-in');
  });

  it('should display sign-in form', () => {
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should show error message on invalid input', () => {
    // Attempt to submit the form with invalid data
    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();

    // Check for error message
    cy.get('span').should('contain', 'Password');
  });

  it('should sign in successfully with valid input', () => {
    // Enter valid data
    cy.get('input[name="username"]').type('somto');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    // Verify successful navigation or message
    cy.url().should('include', '/');
    cy.get('h1').should('contain', 'LIT');
  });
});
