import { useMutation, UseMutationOptions } from "react-query";
import { Task } from "../types";
import Constants from "expo-constants";

export const useSaveTask = (options: UseMutationOptions<Task, any, Task>) => {
  return useMutation<Task, any, Task>(async (newTask: Task) => {
    const response = await fetch(
      `${Constants.manifest?.extra?.SIMPLE_CLEANING_APP_API}/api/saveTask`,
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
