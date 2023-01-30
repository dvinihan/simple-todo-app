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

import { mockRoomsResponse } from "../fixtures/rooms";
import { mockTasksResponse } from "../fixtures/tasks";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      resetDb(): Chainable<void>;
      seedDb(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("resetDb", () => {
  cy.deleteMany({}, { collection: "rooms" });
  cy.deleteMany({}, { collection: "tasks" });
});

Cypress.Commands.add("seedDb", () => {
  cy.insertMany(mockRoomsResponse.rooms, { collection: "rooms" });
  cy.insertMany(mockTasksResponse.tasks, { collection: "tasks" });
});
