import { useQuery, UseQueryOptions } from "react-query";
import { List } from "../types";

const QUERY_KEY = "lists";

export const useListsQuery = (
  options?: UseQueryOptions<List[], Error, List[], typeof QUERY_KEY>
) => useQuery(QUERY_KEY, getLists, options);

const getLists = (): Promise<List[]> =>
  fetch(`/api/lists`)
    .then((res) => res.json())
    .then((data) => sanitize(data));

const sanitize = (data: unknown) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((item) => new List(item));
};
