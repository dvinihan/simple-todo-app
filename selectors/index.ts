import { List } from "../types";
import { createSelector } from "reselect";

export type TaskListSelector<T> = (taskLists: List[], ...args: unknown[]) => T;

export const selectAllTaskLists: TaskListSelector<List[]> = (
  taskLists: List[]
) => taskLists;

export const selectTaskList = (
  id: number
): TaskListSelector<List | undefined> =>
  createSelector(selectAllTaskLists, (taskLists) =>
    taskLists.find((list) => list.id === id)
  );
