import { useQuery, UseQueryOptions } from "react-query";
import { Task } from "../types";
import { TASKS_QUERY_KEY } from "../constants";
import { TasksApiResponse } from "../pages/api/tasks";

export const useTasksQuery = (
  options?: UseQueryOptions<
    TasksApiResponse,
    Error,
    TasksApiResponse,
    typeof TASKS_QUERY_KEY
  >
) => {
  const tasksQuery = useQuery(TASKS_QUERY_KEY, getTasks, options);

  const { data } = tasksQuery;
  const sanitizedTasks = sanitizeTasksData(data?.tasks);

  return {
    ...tasksQuery,
    tasks: sanitizedTasks,
    nextId: data?.nextId,
  };
};

export const getTasks = () => fetch("/api/tasks").then((res) => res.json());

const sanitizeTasksData = (data: unknown) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((item) => new Task(item));
};
