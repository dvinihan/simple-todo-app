import { mockRooms } from "../fixtures/rooms";
import { mockTasks } from "../fixtures/tasks";

it("edit room", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, mockTasks);

  cy.visit("/");
  cy.contains("Family Room").click();
  cy.get('[data-testid="EditIcon"]').click();
  cy.contains("Edit Room").should("be.visible");

  cy.get('input[name="Name"]')
    .should("have.value", "Family Room")
    .clear()
    .type("Office")
    .should("have.value", "Office");

  cy.contains("Save").click();

  cy.contains("Office").should("be.visible");
  cy.contains("Family Room").should("not.exist");
  cy.get('[data-testid="EditIcon"]').click();

  cy.contains("Edit Room").should("be.visible");
  cy.get('input[name="Name"]').should("have.value", "Office");

  cy.get('[data-testid="DeleteIcon"]').click();
  cy.contains("no", { matchCase: false }).click();

  cy.contains("Edit Room").should("be.visible");
  cy.get('[data-testid="DeleteIcon"]').click();
  cy.contains("yes", { matchCase: false }).click();

  cy.contains("Rooms").should("be.visible");
  cy.contains("Office").should("not.exist");
});
