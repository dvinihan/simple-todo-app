import { exec } from "child_process";

const start = () => {
  exec(`${process.argv[2]} yarn start`);
};

start();
