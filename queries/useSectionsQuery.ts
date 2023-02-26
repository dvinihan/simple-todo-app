import { useQuery, UseQueryOptions } from "react-query";
import { List, Section } from "../types";

const QUERY_KEY = "sections";

export const useSectionsQuery = (
  options?: UseQueryOptions<Section[], Error, Section[], typeof QUERY_KEY>
) => useQuery(QUERY_KEY, getSections, options);

const getSections = (): Promise<List[]> =>
  fetch(`/api/sections`)
    .then((res) => res.json())
    .then((data) => sanitize(data));

const sanitize = (data: unknown) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((item) => new Section(item));
};
