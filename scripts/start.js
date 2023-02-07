// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require("child_process");

const start = () => {
  console.log("vinihan - in start with arg", process.argv[2]);
  exec(`${process.argv[2]} yarn start`);
  console.log("vinihan - done!");
};

start();
