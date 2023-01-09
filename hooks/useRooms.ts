import { useQuery, UseQueryOptions } from "react-query";
import { Room } from "../types";
import { ROOMS_QUERY_KEY } from "../constants";
import fetch from "node-fetch";

type RoomsResponse = {
  rooms: Room[];
  nextId: number;
};

export const useRoomsQuery = (
  options?: UseQueryOptions<
    RoomsResponse,
    Error,
    RoomsResponse,
    typeof ROOMS_QUERY_KEY
  >
) => {
  const queryResult = useQuery(ROOMS_QUERY_KEY, getRooms, options);
  return {
    ...queryResult,
    rooms: queryResult.data?.rooms ?? [],
    nextId: queryResult.data?.nextId,
  };
};

export const getRooms = (): Promise<RoomsResponse> =>
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rooms`)
    .then((res) => res.json())
    .then((data) => ({ ...data, rooms: sanitizeRoomsData(data.rooms) }));

const sanitizeRoomsData = (data: unknown) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((item) => new Room(item));
};
