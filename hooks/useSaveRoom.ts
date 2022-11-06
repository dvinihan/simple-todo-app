import { useMutation, UseMutationOptions } from "react-query";
import { Room } from "../types";

export const useSaveRoom = (options: UseMutationOptions<Room, any, Room>) => {
  return useMutation(
    "saveRoom",
    async (newRoom: Room) => {
      const response = await fetch(`/api/saveRoom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });
      const data = await response.json();
      return data;
    },
    options
  );
};
