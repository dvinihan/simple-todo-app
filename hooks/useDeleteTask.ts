import { useMutation, UseMutationOptions } from "react-query";
import { Task } from "../types";

export const useDeleteTask = (
  options: UseMutationOptions<any, any, Task["id"]>
) => {
  return useMutation<any, any, Task["id"]>(async (taskId: Task["id"]) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteTask/${taskId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  }, options);
};
