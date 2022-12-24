import { FocusedTaskList } from "../FocusedTaskList";
import { Frequency } from "../../constants";
import { withQueryClient } from "../../util/test-utils";

const mockRooms = {
  rooms: [
    { id: 0, name: "Family Room" },
    { id: 1, name: "Living Room" },
  ],
};
const mockTasks = {
  tasks: [
    {
      id: 0,
      frequencyAmount: 7,
      frequencyType: Frequency.DAYS,
      lastDone: new Date("1/1/22"),
      name: "Do dishes",
      roomId: 0,
    },
    {
      id: 1,
      frequencyAmount: 7,
      frequencyType: Frequency.MONTHS,
      lastDone: new Date("4/18/22"),
      name: "Take out trash",
      roomId: 0,
    },
    {
      id: 2,
      frequencyAmount: 2,
      frequencyType: Frequency.WEEKS,
      lastDone: new Date("11/1/22"),
      name: "Laundry",
      roomId: 1,
    },
    {
      id: 3,
      frequencyAmount: 2,
      frequencyType: Frequency.WEEKS,
      lastDone: new Date("11/4/22"),
      name: "clean baby",
      roomId: 1,
    },
  ],
};

beforeEach(() => {
  cy.clock(new Date("11/17/2022"));
  cy.intercept(/api\/rooms/, mockRooms);
  cy.intercept(/api\/tasks/, mockTasks);
});

it("overdue tasks - no room id", () => {
  cy.mount(withQueryClient(<FocusedTaskList type="overdue" />));
  cy.findByText("Overdue tasks").should("be.visible");
  cy.findByText("Do dishes").should("be.visible");
  cy.findByText("Laundry").should("be.visible");
  cy.findByTestId("task-Laundry")
    .invoke("attr", "href")
    .should("equal", `/editTask?taskId=2&origin=${window.location.href}`);
});

it("upcoming tasks - no room id", () => {
  cy.mount(withQueryClient(<FocusedTaskList type="upcoming" />));
  cy.findByText("Upcoming tasks").should("be.visible");
  cy.findByText("Take out trash").should("be.visible");
  cy.findByText("clean baby").should("be.visible");
  cy.findByTestId("task-clean baby")
    .invoke("attr", "href")
    .should("equal", `/editTask?taskId=3&origin=${window.location.href}`);
});

it("overdue tasks - no room id", () => {
  cy.mount(withQueryClient(<FocusedTaskList type="overdue" />));
  cy.findByText("Overdue tasks").should("be.visible");
  cy.findByText("Do dishes").should("be.visible");
  cy.findByText("Laundry").should("be.visible");
  cy.findByTestId("task-Do dishes")
    .invoke("attr", "href")
    .should("equal", `/editTask?taskId=0&origin=${window.location.href}`);
});

it("upcoming tasks - no room id", () => {
  cy.mount(withQueryClient(<FocusedTaskList type="upcoming" />));
  cy.findByText("Upcoming tasks").should("be.visible");
  cy.findByText("Take out trash").should("be.visible");
  cy.findByText("clean baby").should("be.visible");
  cy.findByTestId("task-Take out trash")
    .invoke("attr", "href")
    .should("equal", `/editTask?taskId=1&origin=${window.location.href}`);
});
