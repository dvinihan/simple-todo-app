import { mockRooms } from "../../fixtures/rooms";
import { mockTasks } from "../../fixtures/tasks";

it("new task", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, mockTasks);

  cy.visit("/");
  cy.contains("Family Room").click();

  // this is the only reliable indicator the the tasks page has rendered ¯\_(ツ)_/¯
  cy.get('[data-testid="EditIcon"]');
  cy.get('[data-testid="AddIcon"]').click();
  cy.contains("New Task").should("be.visible");

  cy.get('input[name="Name"]')
    .should("have.value", "")
    .type("Clean dishes")
    .should("have.value", "Clean dishes");

  cy.contains("Room: Family Room").should("be.visible").click();
  cy.get('[role="menuitem"]').then((menuItems) => {
    expect(
      Object.values(menuItems)
        .filter((i) => i.textContent)
        .map((i) => i.textContent)
    ).to.deep.equal(["Family Room", "Living Room"]);
  });
  cy.contains("Living Room").click();
  cy.contains("Room: Living Room").should("be.visible");

  cy.get('input[name="Frequency Amount"]')
    .should("have.value", 0)
    .clear()
    .type("2")
    .should("have.value", 2);

  cy.contains("weeks").click();
  cy.get('[role="menuitem"]').then((menuItems) => {
    expect(
      Object.values(menuItems)
        .filter((i) => i.textContent)
        .map((i) => i.textContent)
    ).to.deep.equal(["days", "weeks", "months", "years"]);
  });
  cy.contains("months").click();
  cy.contains("months").should("be.visible");

  cy.get('input[name="Last completed"]')
    .should("have.value", "11/17/2022")
    .click();
  cy.contains("24").click();
  cy.get('input[name="Last completed"]').should("have.value", "11/24/2022");

  cy.contains("Save").click();

  cy.contains("Family Room").should("be.visible");
  cy.get('[data-testid="ArrowBackIcon"]').click();
  cy.contains("Living Room").click();
  cy.contains("Clean dishes").click();

  cy.contains("Edit Task").should("be.visible");
  cy.get('input[name="Name"]').should("have.value", "Clean dishes");
  cy.get('input[name="Frequency Amount"]').should("have.value", 2);
  cy.contains("months").should("be.visible");
  cy.get('input[name="Last completed"]').should("have.value", "11/24/2022");
});
