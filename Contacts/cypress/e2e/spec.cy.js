describe("ContactsFields Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should add a new contact", () => {
    cy.get('input[placeholder="Ім\'я"]').type("John Doe");
    cy.get('input[placeholder="Телефон"]').type("123456789");
    
    cy.contains("Додати").click();
    
    cy.get(".contacts-list").should("contain", "John Doe - 123456789");
  });

  it("should edit an existing contact", () => {
    cy.get('input[placeholder="Ім\'я"]').type("Alice");
    cy.get('input[placeholder="Телефон"]').type("987654321");
    cy.contains("Додати").click();

    cy.contains("Редагувати").first().click();

    cy.get('input[placeholder="Ім\'я"]').clear().type("Alice Updated");
    cy.get('input[placeholder="Телефон"]').clear().type("111111111");

    cy.contains("Редагувати").click();

    cy.get(".contacts-list").should("contain", "Alice Updated - 111111111");
  });

  it("should delete a contact", () => {
    cy.get('input[placeholder="Ім\'я"]').type("Bob");
    cy.get('input[placeholder="Телефон"]').type("555555555");
    cy.contains("Додати").click();

    cy.contains("Видалити").first().click();

    cy.get(".contacts-list").should("not.contain", "Bob - 555555555");
  });

  it("should sort contacts by name", () => {
    cy.get('input[placeholder="Ім\'я"]').type("Charlie");
    cy.get('input[placeholder="Телефон"]').type("333333333");
    cy.contains("Додати").click();

    cy.get('input[placeholder="Ім\'я"]').type("Alice");
    cy.get('input[placeholder="Телефон"]').type("111111111");
    cy.contains("Додати").click();

    cy.get('input[placeholder="Ім\'я"]').type("Bob");
    cy.get('input[placeholder="Телефон"]').type("222222222");
    cy.contains("Додати").click();

    cy.contains("Сортувати за іменем").click();

    cy.get(".contacts-list")
        .children()
        .eq(0)
        .should("contain", "Alice - 111111111");
    cy.get(".contacts-list")
        .children()
        .eq(1)
        .should("contain", "Bob - 222222222");
    cy.get(".contacts-list")
        .children()
        .eq(2)
        .should("contain", "Charlie - 333333333");
  });
});