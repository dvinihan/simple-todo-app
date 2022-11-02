import { useMutation, UseMutationOptions } from "react-query";
import { Task } from "../types";
import Constants from "expo-constants";

export const useDeleteTask = (
  options: UseMutationOptions<any, any, Task["id"]>
) => {
  return useMutation<any, any, Task["id"]>(async (taskId: Task["id"]) => {
    const response = await fetch(
      `${Constants.manifest?.extra?.SIMPLE_CLEANING_APP_API}/api/deleteTask/${taskId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  }, options);
};
