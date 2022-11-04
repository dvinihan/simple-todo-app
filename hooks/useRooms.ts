import { useQuery } from "react-query";
import { ROOMS_QUERY_KEY } from "../constants";
import { RoomsApiResponse } from "../pages/api/rooms";

export const useRoomsQuery = () => {
  return useQuery<void, any, RoomsApiResponse>(ROOMS_QUERY_KEY, getRooms);
};

export const getRooms = () => fetch("/api/rooms").then((res) => res.json());
