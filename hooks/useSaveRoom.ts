import { useMutation, UseMutationOptions } from "react-query";
import { Room } from "../types";
import fetch from "node-fetch";

export const useSaveRoom = (options: UseMutationOptions<void, any, Room>) => {
  return useMutation(
    "saveRoom",
    async (newRoom: Room) => {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/saveRoom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });
    },
    options
  );
};
