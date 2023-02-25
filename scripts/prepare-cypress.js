/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFileSync, readFileSync } = require("fs");

const prepareCypress = () => {
  const envBuffer = readFileSync(".env.test.local");
  const envString = envBuffer.toString();
  const envLines = envString.split("\n");
  const mongoLine = envLines.find((line) => line.startsWith("MONGODB_URI"));
  const mongoUriIndex = mongoLine.indexOf("mongodb+srv://");
  const mongoUri = mongoLine.slice(mongoUriIndex);

  writeFileSync(
    "cypress.env.json",
    `{"mongodb":{"uri":"${mongoUri}","database":"simple-todo-app"}}`
  );
};

prepareCypress();
