import { add } from "date-fns";
import { Task } from "../types";
import { getFrequencyInDays } from "./getFrequencyInDays";

export const getNextDueDate = (task: Task) => {
  const frequencyInDays = getFrequencyInDays(
    task.frequencyType,
    task.frequencyAmount
  );
  return add(task.lastDone, { days: frequencyInDays });
};
