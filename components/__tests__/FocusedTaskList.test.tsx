import { FocusedTaskList } from "../FocusedTaskList";
import { Frequency } from "../../constants";
import { renderWithQueryClient } from "../../util/test-utils";
import { screen } from "@testing-library/react";
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

beforeEach(() => {
  (useRoomsQuery as jest.Mock).mockReturnValue({ rooms: mockRooms });
  (useTasksQuery as jest.Mock).mockReturnValue({ tasks: mockTasks });
});

test("overdue tasks - no room id", async () => {
  jest.useFakeTimers().setSystemTime(new Date("11/17/2022"));
  renderWithQueryClient(<FocusedTaskList type="overdue" />);
  expect(screen.getByText("Overdue tasks")).toBeVisible();
  expect(screen.getByText("Do dishes")).toBeVisible();
  expect(screen.getByText("Laundry")).toBeVisible();
  expect(screen.queryByText("Take out trash")).not.toBeInTheDocument();
  expect(screen.queryByText("clean baby")).not.toBeInTheDocument();
  expect(screen.getByTestId("task-Laundry").getAttribute("href")).toBe(
    `/editTask?taskId=2&origin=${window.location.href}`
  );
});

test("upcoming tasks - no room id", () => {
  jest.useFakeTimers().setSystemTime(new Date("11/17/2022"));
  renderWithQueryClient(<FocusedTaskList type="upcoming" />);
  expect(screen.getByText("Upcoming tasks")).toBeVisible();
  expect(screen.queryByText("Do dishes")).not.toBeInTheDocument();
  expect(screen.queryByText("Laundry")).not.toBeInTheDocument();
  expect(screen.getByText("Take out trash")).toBeVisible();
  expect(screen.getByText("clean baby")).toBeVisible();
  expect(screen.getByTestId("task-clean baby").getAttribute("href")).toBe(
    `/editTask?taskId=3&origin=${window.location.href}`
  );
});

test("overdue tasks - with room id", () => {
  jest.useFakeTimers().setSystemTime(new Date("11/17/2022"));
  renderWithQueryClient(<FocusedTaskList roomId={0} type="overdue" />);
  expect(screen.getByText("Overdue tasks")).toBeVisible();
  expect(screen.getByText("Do dishes")).toBeVisible();
  expect(screen.queryByText("Laundry")).not.toBeInTheDocument();
  expect(screen.queryByText("Take out trash")).not.toBeInTheDocument();
  expect(screen.queryByText("clean baby")).not.toBeInTheDocument();
  expect(screen.getByTestId("task-Do dishes").getAttribute("href")).toBe(
    `/editTask?taskId=0&origin=${window.location.href}`
  );
});

test("upcoming tasks - with room id", () => {
  jest.useFakeTimers().setSystemTime(new Date("11/17/2022"));
  renderWithQueryClient(<FocusedTaskList roomId={0} type="upcoming" />);
  expect(screen.getByText("Upcoming tasks")).toBeVisible();
  expect(screen.queryByText("Do dishes")).not.toBeInTheDocument();
  expect(screen.queryByText("Laundry")).not.toBeInTheDocument();
  expect(screen.getByText("Take out trash")).toBeVisible();
  expect(screen.queryByText("clean baby")).not.toBeInTheDocument();
  expect(screen.getByTestId("task-Take out trash").getAttribute("href")).toBe(
    `/editTask?taskId=1&origin=${window.location.href}`
  );
});

test("overdue tasks - render nothing", () => {
  jest.useFakeTimers().setSystemTime(new Date("11/17/2021"));
  renderWithQueryClient(<FocusedTaskList type="overdue" />);
  expect(screen.queryByText("Overdue tasks")).not.toBeInTheDocument();
  expect(screen.queryByTestId(/task-.*/)).not.toBeInTheDocument;
});

test("upcoming tasks - render nothing", () => {
  jest.useFakeTimers().setSystemTime(new Date("11/17/2021"));
  renderWithQueryClient(<FocusedTaskList type="upcoming" />);
  expect(screen.queryByText("Upcoming tasks")).not.toBeInTheDocument();
  expect(screen.queryByTestId(/task-.*/)).not.toBeInTheDocument;
});
