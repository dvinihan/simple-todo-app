import { useMutation, UseMutationOptions } from "react-query";
import { Room } from "../types";

export const useDeleteRoom = (
  options: UseMutationOptions<any, any, Room["id"]>
) => {
  return useMutation<any, any, Room["id"]>(async (roomId: Room["id"]) => {
    const response = await fetch(`/api/deleteRoom/${roomId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  }, options);
};
