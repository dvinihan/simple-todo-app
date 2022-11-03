import { useQuery } from "react-query";
import { Room } from "../types";
import { ROOMS_QUERY_KEY } from "../constants";

export const useRoomsQuery = () => {
  const roomsQuery = useQuery(ROOMS_QUERY_KEY, () =>
    fetch("/api/rooms").then((res) => res.json())
  );

  const { data = {} } = roomsQuery;
  const sanitizedRooms = sanitizeRoomsData(data.rooms);

  return {
    ...roomsQuery,
    rooms: sanitizedRooms,
    nextId: data.nextId,
  };
};

const sanitizeRoomsData = (data: unknown) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((item) => new Room(item));
};
