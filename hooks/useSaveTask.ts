import { useMutation, UseMutationOptions } from "react-query";
import { Task } from "../types";
import fetch from "node-fetch";

export const useSaveTask = (options: UseMutationOptions<Task, any, Task>) => {
  return useMutation(async (newTask: Task) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/saveTask`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      }
    );
    const data = await response.json();
    return data;
  }, options);
};
