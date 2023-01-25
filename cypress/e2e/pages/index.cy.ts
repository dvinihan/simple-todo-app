import { mockRoomsResponse } from "../../fixtures/rooms";
import { mockTasksResponse } from "../../fixtures/tasks";

it("tasks and rooms are rendered correctly", () => {
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
        "Do dishes in Family Room, 381 days overdue",
        "Laundry in Living Room, 70 days overdue",
        "clean baby in Living Room, 67 days overdue",
        "Take out trash in Family Room, 64 days overdue",
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
