/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

import { Room, Task as MyTask } from "../../types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      resetDb(): Chainable<void>;
      seedDb(rooms: Room[], tasks: MyTask[]): Chainable<void>;
    }
  }
}

Cypress.Commands.add("resetDb", () => {
  cy.deleteMany({}, { collection: "rooms" });
  cy.deleteMany({}, { collection: "tasks" });
});

Cypress.Commands.add("seedDb", (rooms: Room[], tasks: MyTask[]) => {
  if (rooms.length > 0) cy.insertMany(rooms, { collection: "rooms" });
  if (tasks.length > 0) cy.insertMany(tasks, { collection: "tasks" });
});
