import { defineConfig } from "cypress";
import { configurePlugin } from "cypress-mongodb";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    // pages can take a long time to load on localhost
    defaultCommandTimeout: 12000,
    setupNodeEvents(on) {
      configurePlugin(on);
    },
  },
});
