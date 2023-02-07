import { mockRooms } from "../../fixtures/rooms";
import { mockTasks } from "../../fixtures/tasks";

export {};

it("existing task", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, mockTasks);

  cy.visit("/");
  cy.contains("Do dishes in Family Room, 313 days overdue").click();
  cy.contains("Edit Task").should("be.visible");
  cy.get('input[name="Name"]').should("have.value", "Do dishes");
  cy.contains("Room: Family Room").should("be.visible");
  cy.get('input[name="Frequency Amount"]').should("have.value", 7);
  cy.get("button").then((buttons) => {
    expect(Object.values(buttons)[0]).to.have.text("days");
  });
  cy.get('input[name="Last completed"]').should("have.value", "01/01/22");
});
