describe("Testing our form inputs", function() {
    beforeEach(function() {
      cy.visit("http://localhost:3000/Form");
    })
    it("Adds text to inputs and submits form", function() {
        cy.get('input[name="name"]')
          .type("Heath")
          .should("have.value", 'Heath')
        cy.get('#positions')
          .select("medium")
        cy.get('[for="pepperoni"] > input')
          .check()
        cy.get('[for="ham"] > input')
          .check()
        cy.get('textarea')
          .type("I want it fast")
          .should("have.value", "I want it fast")
        cy.get('[for="terms"] > input')
          .check() 
        cy.get('button')
          .click()
    })
});      
