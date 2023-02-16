export const HOME_ROUTE = "/";
export const TASKS_ROUTE = "/tasks";
export const EDIT_TASK_ROUTE = "/editTask";
export const EDIT_ROOM_ROUTE = "/editRoom";
export const NEW_TASK_ROUTE = "/newTask";
export const NEW_ROOM_ROUTE = "/newRoom";

export const ROOMS_QUERY_KEY = "rooms";
export const TASKS_QUERY_KEY = "tasks";

export enum Frequency {
  DAYS = "days",
  WEEKS = "weeks",
  MONTHS = "months",
  YEARS = "years",
}

export const CANCEL_ROUTE_CHANGE_ERROR_MESSAGE =
  "Canceling route change from _app.tsx";
