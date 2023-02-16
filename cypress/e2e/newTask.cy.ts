import { mockRooms } from "../fixtures/rooms";
import { mockTasks } from "../fixtures/tasks";

it("new task", () => {
  /* Setup */
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, mockTasks);

  /* Save new task - error */
  cy.visit("/");
  cy.contains("Family Room").click();

  // this is the only reliable indicator the the tasks page has rendered ¯\_(ツ)_/¯
  cy.get('[data-testid="EditIcon"]');
  cy.get('[data-testid="AddIcon"]').click();
  cy.contains("New Task").should("be.visible");

  cy.contains("Save").click();
  cy.contains("You must enter a task name").should("be.visible");

  /* Save new task - success */
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

  cy.contains("Living Room").should("be.visible");
  cy.contains("Clean dishes").click();

  cy.contains("Edit Task").should("be.visible");
  cy.get('input[name="Name"]').should("have.value", "Clean dishes");
  cy.get('input[name="Frequency Amount"]').should("have.value", 2);
  cy.contains("months").should("be.visible");
  cy.get('input[name="Last completed"]').should("have.value", "11/24/2022");

  /* "Just did it" button */
  cy.contains("Just did it", { matchCase: false }).click();

  cy.contains("Living Room").click();
  cy.contains("Clean dishes").click();
  cy.contains("Edit Task").should("be.visible");
  cy.get('input[name="Last completed"]').should("have.value", "11/17/2022");

  /* Discard modal from navbar, click no */
  cy.get('input[name="Name"]')
    .should("have.value", "Clean dishes")
    .type("blahblah");
  cy.get('[data-testid="ArrowBackIcon"]').click();
  cy.contains("Save changes?").should("be.visible");
  cy.contains("no", { matchCase: false }).click();

  /* Discard modal from navbar, click yes */
  cy.contains("Rooms").should("not.exist");
  cy.contains("Clean dishes").click();
  cy.get('input[name="Name"]')
    .should("have.value", "Clean dishes")
    .type("blahblah");
  cy.get('[data-testid="ArrowBackIcon"]').click();
  cy.contains("Save changes?").should("be.visible");
  cy.contains("yes", { matchCase: false }).click();
  cy.contains("Rooms").should("not.exist");
  cy.contains("Laundry").should("be.visible");
  cy.contains("clean baby").should("be.visible");
  cy.contains("Clean dishesblahblah").should("be.visible").click();

  /* Discard modal from broswer back button, click no */
  cy.contains("Edit Task").should("be.visible");
  cy.get('input[name="Name"]')
    .should("have.value", "Clean dishesblahblah")
    .type(" and more!");
  cy.go("back");
  cy.contains("Save changes?").should("be.visible");
  cy.contains("no", { matchCase: false }).click();

  /* Discard modal from broswer back button, click yes */
  cy.contains("Rooms").should("not.exist");
  cy.contains("Living Room").click();
  cy.contains("Clean dishesblahblah").click();
  cy.get('input[name="Name"]')
    .should("have.value", "Clean dishesblahblah")
    .type(" and more!");
  cy.go("back");
  cy.contains("Save changes?").should("be.visible");
  cy.contains("yes", { matchCase: false }).click();
  cy.contains("Rooms").should("not.exist");
  cy.contains("Laundry").should("be.visible");
  cy.contains("clean baby").should("be.visible");
  cy.contains("Clean dishesblahblah and more!").should("be.visible");
});
