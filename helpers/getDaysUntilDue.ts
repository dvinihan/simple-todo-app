import { differenceInCalendarDays } from "date-fns";
import { Task } from "../types";
import { getNextDueDate } from "./getNextDueDate";

export const getDaysUntilDue = (task: Task) => {
  const nextDue = getNextDueDate(task);
  return differenceInCalendarDays(nextDue, new Date());
};
