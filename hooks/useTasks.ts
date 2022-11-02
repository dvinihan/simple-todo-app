import { useQuery } from "react-query";
import { Task } from "../types";
import Constants from "expo-constants";
import { TASKS_QUERY_KEY } from "../constants";

export const useTasksQuery = () => {
  const tasksQuery = useQuery(TASKS_QUERY_KEY, () =>
    fetch(
      `${Constants.manifest?.extra?.SIMPLE_CLEANING_APP_API}/api/tasks`
    ).then((res) => res.json())
  );

  const { data = {} } = tasksQuery;
  const sanitizedTasks = sanitizeTasksData(data.tasks);

  return {
    ...tasksQuery,
    tasks: sanitizedTasks,
    nextId: data.nextId,
  };
};

const sanitizeTasksData = (data: unknown) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((item) => new Task(item));
};
