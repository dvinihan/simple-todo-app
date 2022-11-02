import { ParsedUrlQuery } from "querystring";

export const getTaskIdFromUrl = (query: ParsedUrlQuery) =>
  !("taskId" in query) || query.taskId === undefined
    ? undefined
    : Number(query.taskId);

export const getRoomIdFromUrl = (query: ParsedUrlQuery) =>
  !("roomId" in query) || query.roomId === undefined
    ? undefined
    : Number(query.roomId);
