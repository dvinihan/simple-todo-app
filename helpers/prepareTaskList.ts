import { Task, TaskWithDaysUntilDue } from "../types";
import { getDaysUntilDue } from "./getDaysUntilDue";
import { getFrequencyInDays } from "./getFrequencyInDays";

export const prepareTaskList = (
  type: "upcoming" | "overdue",
  tasks: Task[],
  roomId?: number
) => {
  const tasksWithDaysUntilDue: TaskWithDaysUntilDue[] = tasks
    .filter((t) => (roomId === undefined ? true : t.roomId === roomId))
    .map((t) => ({
      ...t,
      daysUntilDue: getDaysUntilDue(t),
    }));

  let qualifyingTasks: TaskWithDaysUntilDue[];
  switch (type) {
    case "upcoming": {
      qualifyingTasks = filterForUpcomingTasks(tasksWithDaysUntilDue);
      break;
    }
    case "overdue": {
      qualifyingTasks = filterForOverdueTasks(tasksWithDaysUntilDue);
      break;
    }
    default: {
      qualifyingTasks = [];
    }
  }
  return qualifyingTasks.sort((a, b) => a.daysUntilDue - b.daysUntilDue);
};

const filterForUpcomingTasks = (tasks: TaskWithDaysUntilDue[]) => {
  return tasks.filter(
    (t: TaskWithDaysUntilDue) =>
      t.daysUntilDue > 0 &&
      t.daysUntilDue <
        getFrequencyInDays(t.frequencyType, t.frequencyAmount) * 0.1
  );
};

const filterForOverdueTasks = (tasks: TaskWithDaysUntilDue[]) => {
  return tasks.filter((t: TaskWithDaysUntilDue) => t.daysUntilDue <= 0);
};
