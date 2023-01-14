import { Task } from "../../types";
import { getDaysUntilDue } from "../getDaysUntilDue";
import { getNextDueDate } from "../getNextDueDate";

jest.mock("../getNextDueDate.ts");

test("getDaysUntilDue", () => {
  jest.useFakeTimers().setSystemTime(new Date("3/1/19"));
  (getNextDueDate as jest.Mock).mockReturnValue(new Date("3/4/19"));
  const task = new Task();
  const result = getDaysUntilDue(task);
  expect(result).toBe(3);
  expect(getNextDueDate).toBeCalledWith(task);
});
