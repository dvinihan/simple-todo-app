import { useQuery, UseQueryOptions } from "react-query";
import { Task } from "../types";

const QUERY_KEY = "tasks";

export const useTasksQuery = (
  options?: UseQueryOptions<Task[], Error, Task[], typeof QUERY_KEY>
) => useQuery(QUERY_KEY, getTasks, options);

const getTasks = (): Promise<Task[]> =>
  fetch(`/api/tasks`)
    .then((res) => res.json())
    .then((data) => sanitize(data));

const sanitize = (data: unknown) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((item) => new Task(item));
};
