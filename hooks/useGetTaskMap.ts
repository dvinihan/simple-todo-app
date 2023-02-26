import {
  buildExtendedTasks,
  filterForOverdueTasks,
  filterForUpcomingTasks,
  filterTasksByRoom,
} from "../helpers/taskMap";
import { useRoomsQuery } from "../queries/useRooms";
import { useTaskLists } from "../queries/useListsQuery";
import { ExtendedTask } from "../types";
import { useIdParams } from "./useIdParams";

export type TaskMap = {
  upcomingTasks: ExtendedTask[];
  overdueTasks: ExtendedTask[];
};

export const useGetTaskMap = (): TaskMap => {
  const { rooms } = useRoomsQuery();
  const { tasks } = useTaskLists();
  const { roomId } = useIdParams();

  const tasksFilteredByRoom = filterTasksByRoom(tasks, roomId);
  const extendedTasks = buildExtendedTasks(tasksFilteredByRoom, rooms);

  const unsortedUpcomingTasks = filterForUpcomingTasks(extendedTasks);
  const unsortedOverDueTasks = filterForOverdueTasks(extendedTasks);

  const sortedUpcomingTasks = unsortedUpcomingTasks.sort(
    (a, b) => a.daysUntilDue - b.daysUntilDue
  );
  const sortedOverdueTasks = unsortedOverDueTasks.sort(
    (a, b) => a.daysUntilDue - b.daysUntilDue
  );

  return {
    upcomingTasks: sortedUpcomingTasks,
    overdueTasks: sortedOverdueTasks,
  };
};
