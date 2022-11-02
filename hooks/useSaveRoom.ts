import { useMutation, UseMutationOptions } from "react-query";
import { Room } from "../types";
import Constants from "expo-constants";

export const useSaveRoom = (options: UseMutationOptions<Room, any, Room>) => {
  return useMutation<Room, any, Room>(
    "saveRoom",
    async (newRoom: Room) => {
      const response = await fetch(
        `${Constants.manifest?.extra?.SIMPLE_CLEANING_APP_API}/api/saveRoom`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRoom),
        }
      );
      const data = await response.json();
      return data;
    },
    options
  );
};
