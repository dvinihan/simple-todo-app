import { useQuery, UseQueryOptions } from "react-query";
import { Room } from "../types";
import { ROOMS_QUERY_KEY } from "../constants";
import { RoomsApiResponse } from "../pages/api/rooms";

export const useRoomsQuery = (
  options?: UseQueryOptions<
    RoomsApiResponse,
    Error,
    RoomsApiResponse,
    typeof ROOMS_QUERY_KEY
  >
) => {
  const roomsQuery = useQuery(ROOMS_QUERY_KEY, getRooms, options);

  const { data } = roomsQuery;
  const sanitizedRooms = sanitizeRoomsData(data?.rooms);

  return {
    ...roomsQuery,
    rooms: sanitizedRooms,
    nextId: data?.nextId,
  };
};

export const getRooms = () => fetch("/api/rooms").then((res) => res.json());

const sanitizeRoomsData = (data: unknown) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((item) => new Room(item));
};
