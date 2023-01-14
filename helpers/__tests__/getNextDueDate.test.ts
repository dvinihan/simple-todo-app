import { Task } from "../../types";
import { getFrequencyInDays } from "../getFrequencyInDays";
import { getNextDueDate } from "../getNextDueDate";

jest.mock("../getFrequencyInDays");

test("getNextDueDate", () => {
  (getFrequencyInDays as jest.Mock).mockReturnValue(7);
  const task = new Task({ lastDone: new Date("2/1/21").getTime() });
  expect(getNextDueDate(task)).toEqual(new Date("2/8/21"));
});
