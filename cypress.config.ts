import { defineConfig } from "cypress";
import { configurePlugin } from "cypress-mongodb";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 8000,
    setupNodeEvents(on) {
      configurePlugin(on);
    },
  },
});
