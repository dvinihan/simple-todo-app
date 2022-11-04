import { useQuery } from "react-query";
import { TASKS_QUERY_KEY } from "../constants";
import { TasksApiResponse } from "../pages/api/tasks";

export const useTasksQuery = () => {
  return useQuery<void, any, TasksApiResponse>(TASKS_QUERY_KEY, getTasks);
};

export const getTasks = () => fetch("/api/tasks").then((res) => res.json());
