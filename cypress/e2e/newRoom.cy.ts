import { mockRooms } from "../fixtures/rooms";
import { mockTasks } from "../fixtures/tasks";

it("new room", () => {
  /* Setup */
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, mockTasks);

  /* Save new room - error */
  cy.visit("/");
  cy.get('[data-testid="AddIcon"]').click();

  cy.contains("New Room").should("be.visible");

  cy.contains("Save").click();
  cy.contains("You must enter a room name").should("be.visible");

  /* Save new room - success */
  cy.get('input[name="Name"]')
    .should("have.value", "")
    .clear()
    .type("Office")
    .should("have.value", "Office");

  cy.contains("Save").click();

  cy.contains("Rooms").should("not.exist");
  cy.contains("Office").should("be.visible");
  cy.contains("Family Room").should("not.exist");
  cy.get('[data-testid="EditIcon"]').click();

  cy.contains("Edit Room").should("be.visible");
  cy.get('input[name="Name"]').should("have.value", "Office").type("blahblah");

  /* Discard modal from navbar, click no */
  cy.get('[data-testid="ArrowBackIcon"]').click();
  cy.contains("Save changes?").should("be.visible");
  cy.contains("no", { matchCase: false }).click();
  cy.contains("Rooms").should("be.visible");

  /* Discard modal from navbar, click yes */
  cy.contains("Office").click();
  cy.get('[data-testid="EditIcon"]').click();
  cy.get('input[name="Name"]').should("have.value", "Office").type("blahblah");
  cy.get('[data-testid="ArrowBackIcon"]').click();
  cy.contains("Save changes?").should("be.visible");
  cy.contains("yes", { matchCase: false }).click();
  cy.contains("Rooms").should("be.visible");
  cy.contains("Officeblahblah").should("be.visible").click();

  /* Discard modal from broswer back button, click no */
  cy.get('[data-testid="EditIcon"]').click();
  cy.get('input[name="Name"]')
    .should("have.value", "Officeblahblah")
    .type(" and more!");
  cy.go("back");
  cy.contains("Save changes?").should("be.visible");
  cy.contains("no", { matchCase: false }).click();
  cy.contains("Rooms").should("not.exist");

  /* Discard modal from broswer back button, click yes */
  cy.contains("Officeblahblah").should("be.visible");
  cy.get('[data-testid="EditIcon"]').click();
  cy.get('input[name="Name"]')
    .should("have.value", "Officeblahblah")
    .type(" and more!");
  cy.go("back");
  cy.contains("Save changes?").should("be.visible");
  cy.contains("yes", { matchCase: false }).click();
  cy.contains("Rooms").should("not.exist");
  cy.contains("Officeblahblah and more!").should("be.visible");
});
