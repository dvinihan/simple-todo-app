import { mockRooms } from "../../fixtures/rooms";
import { mockTasks, overdueTasks, upcomingTasks } from "../../fixtures/tasks";

it("overdue and upcoming tasks", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, mockTasks);

  cy.visit("/");
  cy.contains("Rooms").should("be.visible");
  cy.contains("Overdue tasks").should("be.visible");
  cy.contains("Upcoming tasks").should("be.visible");
  cy.get('[data-testid="task-link"]')
    .then((links) =>
      Object.values(links)
        .filter((link) => link.textContent)
        .map((link) => link.textContent)
    )
    .then((text) => {
      expect(Object.values(text)).to.deep.equal([
        "Do dishes in Family Room, 313 days overdue",
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

it("only overdue tasks", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, overdueTasks);

  cy.visit("/");
  cy.contains("Rooms").should("be.visible");
  cy.contains("Overdue tasks").should("be.visible");
  cy.contains("Upcoming tasks").should("not.exist");
  cy.get('[data-testid="task-link"]')
    .then((links) =>
      Object.values(links)
        .filter((link) => link.textContent)
        .map((link) => link.textContent)
    )
    .then((text) => {
      expect(Object.values(text)).to.deep.equal([
        "Do dishes in Family Room, 313 days overdue",
        "Laundry in Living Room, 2 days overdue",
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

it("only upcoming tasks", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, upcomingTasks);

  cy.visit("/");
  cy.contains("Rooms").should("be.visible");
  cy.contains("Overdue tasks").should("not.exist");
  cy.contains("Upcoming tasks").should("be.visible");
  cy.get('[data-testid="task-link"]')
    .then((links) =>
      Object.values(links)
        .filter((link) => link.textContent)
        .map((link) => link.textContent)
    )
    .then((text) => {
      expect(Object.values(text)).to.deep.equal([
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

it("no overdue or upcoming tasks", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, []);

  cy.visit("/");
  cy.contains("Rooms").should("be.visible");
  cy.contains("Overdue tasks").should("not.exist");
  cy.contains("Upcoming tasks").should("not.exist");
  cy.get('[data-testid="task-link"]').should("not.exist");
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
