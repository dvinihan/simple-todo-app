import { ExtendedTask, Room, Task } from "../types";
import { getDaysUntilDue } from "./getDaysUntilDue";
import { getFrequencyInDays } from "./getFrequencyInDays";

export const filterTasksByRoom = (
  tasks: Task[],
  roomId: number | undefined
): Task[] =>
  roomId === undefined ? tasks : tasks.filter((task) => task.roomId === roomId);

export const buildExtendedTasks = (
  tasks: Task[],
  rooms: Room[]
): ExtendedTask[] => {
  return tasks.map((task) => ({
    ...task,
    daysUntilDue: getDaysUntilDue(task),
    roomName: rooms.find((room) => room.id === task.roomId)?.name ?? "",
  }));
};

export const filterForUpcomingTasks = (
  tasks: ExtendedTask[]
): ExtendedTask[] => {
  return tasks.filter(
    (task) =>
      task.daysUntilDue > 0 &&
      task.daysUntilDue <
        getFrequencyInDays(task.frequencyType, task.frequencyAmount) * 0.1
  );
};

export const filterForOverdueTasks = (
  tasks: ExtendedTask[]
): ExtendedTask[] => {
  return tasks.filter((task) => task.daysUntilDue <= 0);
};
