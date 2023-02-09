import { mockRooms } from "../fixtures/rooms";
import { mockTasks, overdueTasks, upcomingTasks } from "../fixtures/tasks";

it("overdue and upcoming tasks", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, mockTasks);

  cy.visit("/");
  cy.contains("Living Room").click();
  // this is the only reliable indicator the the tasks page has rendered ¯\_(ツ)_/¯
  cy.get('[data-testid="EditIcon"]');
  cy.contains("Overdue tasks").should("be.visible");
  cy.contains("Upcoming tasks").should("be.visible");
  cy.get('[data-testid="focused-task-link"]')
    .then((links) =>
      Object.values(links)
        .filter((link) => link.textContent)
        .map((link) => link.textContent)
    )
    .then((text) => {
      expect(Object.values(text)).to.deep.equal([
        "Laundry in Living Room, 2 days overdue",
        "clean baby in Living Room, due in 1 day",
      ]);
    });
  cy.get('[data-testid="task-link"]')
    .then((tasks) =>
      Object.values(tasks)
        .filter((task) => task.textContent)
        .map((task) => task.textContent)
    )
    .then((text) => {
      expect(Object.values(text)).to.deep.equal(["Laundry", "clean baby"]);
    });
});

it("only overdue tasks", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, overdueTasks);

  cy.visit("/");
  cy.contains("Living Room").click();
  // this is the only reliable indicator the the tasks page has rendered ¯\_(ツ)_/¯
  cy.get('[data-testid="EditIcon"]');
  cy.contains("Overdue tasks").should("be.visible");
  cy.contains("Upcoming tasks").should("not.exist");
  cy.get('[data-testid="focused-task-link"]')
    .then((links) =>
      Object.values(links)
        .filter((link) => link.textContent)
        .map((link) => link.textContent)
    )
    .then((text) => {
      expect(Object.values(text)).to.deep.equal([
        "Laundry in Living Room, 2 days overdue",
      ]);
    });
  cy.get('[data-testid="task-link"]')
    .then((rooms) =>
      Object.values(rooms)
        .filter((room) => room.textContent)
        .map((room) => room.textContent)
    )
    .then((text) => {
      expect(Object.values(text)).to.deep.equal(["Laundry"]);
    });
});

it("only upcoming tasks", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, upcomingTasks);

  cy.visit("/");
  cy.contains("Living Room").click();
  // this is the only reliable indicator the the tasks page has rendered ¯\_(ツ)_/¯
  cy.get('[data-testid="EditIcon"]');
  cy.contains("Overdue tasks").should("not.exist");
  cy.contains("Upcoming tasks").should("be.visible");
  cy.get('[data-testid="focused-task-link"]')
    .then((links) =>
      Object.values(links)
        .filter((link) => link.textContent)
        .map((link) => link.textContent)
    )
    .then((text) => {
      expect(Object.values(text)).to.deep.equal([
        "clean baby in Living Room, due in 1 day",
      ]);
    });
  cy.get('[data-testid="task-link"]')
    .then((rooms) =>
      Object.values(rooms)
        .filter((room) => room.textContent)
        .map((room) => room.textContent)
    )
    .then((text) => {
      expect(Object.values(text)).to.deep.equal(["clean baby"]);
    });
});

it("no overdue or upcoming tasks", () => {
  cy.clock(new Date("11/17/22").getTime(), ["Date"]);
  cy.resetDb();
  cy.seedDb(mockRooms, []);

  cy.visit("/");
  cy.contains("Living Room").click();
  // this is the only reliable indicator the the tasks page has rendered ¯\_(ツ)_/¯
  cy.get('[data-testid="EditIcon"]');
  cy.contains("Overdue tasks").should("not.exist");
  cy.contains("Upcoming tasks").should("not.exist");
  cy.get('[data-testid="focused-task-link"]').should("not.exist");
  cy.get('[data-testid="task-link"]').should("not.exist");
});
