import { mockRoomsResponse } from "../../fixtures/rooms";
import { mockTasksResponse } from "../../fixtures/tasks";

it("tasks and rooms are rendered correctly", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.intercept("/api/rooms", mockRoomsResponse);
  cy.intercept("/api/tasks", mockTasksResponse);
  cy.visit("/");
  cy.contains("Overdue tasks").should("be.visible");
  cy.get('[data-testid="task-link"]')
    .then((links) =>
      Object.values(links)
        .filter((link) => link.textContent)
        .map((link) => link.textContent)
    )
    .then((text) => {
      expect(Object.values(text)).to.deep.equal([
        "Do dishes in Family Room, 314 days overdue",
        "Laundry in Living Room, 2 days overdue",
        "clean baby in Living Room, due in 1 day",
        "Take out trash in Family Room, due in 4 days",
      ]);
    });
  cy.get('[data-testid="room-link"]')
    .then((rooms) =>
      Object.values(rooms)
        .filter((room) => room.textContent)
        .map((room) => room.textContent)
    )
    .then((text) => {
      expect(Object.values(text)).to.deep.equal(["Family Room", "Living Room"]);
    });
});
