import { mockRooms } from "../fixtures/rooms";
import { mockTasks } from "../fixtures/tasks";

it("edit task", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, mockTasks);

  cy.visit("/");
  cy.contains("Do dishes in Family Room, 313 days overdue").click();
  cy.contains("Edit Task").should("be.visible");

  cy.get('input[name="Name"]')
    .should("have.value", "Do dishes")
    .clear()
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
    .should("have.value", 7)
    .clear()
    .type("2")
    .should("have.value", 2);

  cy.contains("days").click();
  cy.get('[role="menuitem"]').then((menuItems) => {
    expect(
      Object.values(menuItems)
        .filter((i) => i.textContent)
        .map((i) => i.textContent)
    ).to.deep.equal(["days", "weeks", "months", "years"]);
  });
  cy.contains("weeks").click();
  cy.contains("weeks").should("be.visible");

  cy.get('input[name="Last completed"]')
    .should("have.value", "01/01/2022")
    .click();
  cy.contains("24").click();
  cy.get('input[name="Last completed"]').should("have.value", "11/24/2022");

  cy.contains("Save").click();

  cy.contains("Rooms").should("be.visible");
  cy.contains("Living Room").click();
  cy.contains("Clean dishes").click();

  cy.contains("Edit Task").should("be.visible");
  cy.get('input[name="Name"]').should("have.value", "Clean dishes");
  cy.get('input[name="Frequency Amount"]').should("have.value", 2);
  cy.contains("weeks").should("be.visible");
  cy.get('input[name="Last completed"]').should("have.value", "11/24/2022");

  cy.contains("Just did it", { matchCase: false }).click();

  cy.contains("Living Room").click();
  cy.contains("Clean dishes").click();
  cy.contains("Edit Task").should("be.visible");
  cy.get('input[name="Last completed"]').should("have.value", "11/17/2022");

  cy.get('[data-testid="DeleteIcon"]').click();
  cy.contains("no", { matchCase: false }).click();

  cy.contains("Edit Task").should("be.visible");
  cy.get('[data-testid="DeleteIcon"]').click();
  cy.contains("yes", { matchCase: false }).click();

  // this is the only reliable indicator the the tasks page has rendered ¯\_(ツ)_/¯
  cy.get('[data-testid="EditIcon"]');
  cy.contains("Clean dishes").should("not.exist");
});
