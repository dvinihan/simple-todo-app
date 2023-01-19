import { useMutation, UseMutationOptions } from "react-query";
import { Room } from "../types";

export const useSaveRoom = (options: UseMutationOptions<void, any, Room>) => {
  return useMutation(
    "saveRoom",
    async (newRoom: Room) => {
      await fetch(`/api/saveRoom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });
    },
    options
  );
};
