import { useMutation, UseMutationOptions } from "react-query";
import { Task } from "../types";

export const useSaveTask = (
  options: UseMutationOptions<Task, unknown, Task> = {}
) => {
  return useMutation(async (newTask: Task) => {
    const response = await fetch(`/api/saveTask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
    return data;
  }, options);
};
