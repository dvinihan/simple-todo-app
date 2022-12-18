import { FocusedTaskList } from "../FocusedTaskList";
import { Frequency } from "../../constants";
import { screen } from "@testing-library/react";
import { renderPage } from "../../util/test-utils";
import { useRoomsQuery } from "../../hooks/useRooms";
import { useTasksQuery } from "../../hooks/useTasks";

jest.mock("../../hooks/useRooms");
jest.mock("../../hooks/useTasks");

const mockRooms = [
  { id: 0, name: "Family Room" },
  { id: 1, name: "Living Room" },
];
const mockTasks = [
  {
    id: 0,
    frequencyAmount: 7,
    frequencyType: Frequency.DAYS,
    lastDone: new Date("1/1/22"),
    name: "Do dishes",
    roomId: 0,
  },
  {
    id: 1,
    frequencyAmount: 7,
    frequencyType: Frequency.MONTHS,
    lastDone: new Date("4/18/22"),
    name: "Take out trash",
    roomId: 0,
  },
  {
    id: 2,
    frequencyAmount: 2,
    frequencyType: Frequency.WEEKS,
    lastDone: new Date("11/1/22"),
    name: "Laundry",
    roomId: 1,
  },
  {
    id: 3,
    frequencyAmount: 2,
    frequencyType: Frequency.WEEKS,
    lastDone: new Date("11/4/22"),
    name: "clean baby",
    roomId: 1,
  },
];

beforeAll(() => {
  (useRoomsQuery as jest.Mock).mockReturnValue({ rooms: mockRooms });
  (useTasksQuery as jest.Mock).mockReturnValue({ tasks: mockTasks });
});
test("overdue tasks - no room id", async () => {
  jest.useFakeTimers().setSystemTime(new Date("11/17/2022"));

  renderPage(<FocusedTaskList type="overdue" />);

  expect(screen.getByText("Overdue tasks")).toBeVisible();
  expect(screen.getByText("Do dishes")).toBeVisible();
  expect(screen.getByText("Laundry")).toBeVisible();
  expect(screen.getByTestId("task-Laundry").getAttribute("href")).toBe(
    "/editTask?taskId=2&origin=http://localhost/"
  );
});
test("upcoming tasks - no room id", async () => {
  jest.useFakeTimers().setSystemTime(new Date("11/17/2022"));

  renderPage(<FocusedTaskList type="upcoming" />);

  expect(screen.getByText("Upcoming tasks")).toBeVisible();
  expect(screen.getByText("Take out trash")).toBeVisible();
  expect(screen.getByText("clean baby")).toBeVisible();
  expect(screen.getByTestId("task-clean baby").getAttribute("href")).toBe(
    "/editTask?taskId=3&origin=http://localhost/"
  );
});
test("overdue tasks - room id", async () => {
  jest.useFakeTimers().setSystemTime(new Date("11/17/2022"));

  renderPage(<FocusedTaskList roomId={0} type="overdue" />);

  expect(screen.getByText("Overdue tasks")).toBeVisible();
  expect(screen.getByText("Do dishes")).toBeVisible();
  expect(screen.queryByText("Laundry")).toBeNull();
  expect(screen.getByTestId("task-Do dishes").getAttribute("href")).toBe(
    "/editTask?taskId=0&origin=http://localhost/"
  );
});
test("upcoming tasks - room id", async () => {
  jest.useFakeTimers().setSystemTime(new Date("11/17/2022"));

  renderPage(<FocusedTaskList roomId={0} type="upcoming" />);

  expect(screen.getByText("Upcoming tasks")).toBeVisible();
  expect(screen.getByText("Take out trash")).toBeVisible();
  expect(screen.queryByText("clean baby")).toBeNull();
  expect(screen.getByTestId("task-Take out trash").getAttribute("href")).toBe(
    "/editTask?taskId=1&origin=http://localhost/"
  );
});
