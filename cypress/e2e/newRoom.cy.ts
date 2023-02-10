import { mockRooms } from "../fixtures/rooms";
import { mockTasks } from "../fixtures/tasks";

it("new room", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, mockTasks);

  cy.visit("/");
  cy.get('[data-testid="AddIcon"]').click();

  cy.contains("New Room").should("be.visible");

  cy.contains("Save").click();
  cy.contains("You must enter a room name").should("be.visible");

  cy.get('input[name="Name"]')
    .should("have.value", "")
    .clear()
    .type("Office")
    .should("have.value", "Office");

  cy.contains("Save").click();

  cy.contains("Office").should("be.visible");
  cy.contains("Family Room").should("not.exist");
  cy.get('[data-testid="EditIcon"]').click();

  cy.contains("Edit Room").should("be.visible");
  cy.get('input[name="Name"]').should("have.value", "Office").type("blahblah");

  cy.get('[data-testid="ArrowBackIcon"]').click();
  cy.contains("Save changes?").should("be.visible");
  cy.contains("no", { matchCase: false }).click();
  cy.contains("Rooms").should("be.visible");

  cy.contains("Office").click();
  cy.get('[data-testid="EditIcon"]').click();
  cy.get('input[name="Name"]').should("have.value", "Office").type("blahblah");
  cy.get('[data-testid="ArrowBackIcon"]').click();
  cy.contains("Save changes?").should("be.visible");
  cy.contains("yes", { matchCase: false }).click();
  cy.contains("Rooms").should("be.visible");
  cy.contains("Officeblahblah").should("be.visible");
});
