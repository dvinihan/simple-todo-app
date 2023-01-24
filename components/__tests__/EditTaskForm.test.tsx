import { Task } from "../../types";
import { renderWithQueryClient } from "../../util/test-utils";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditTaskForm from "../EditTaskForm";
import { Frequency } from "../../constants";
import fetchMock from "fetch-mock";
import * as router from "next/router";

type BeforePopStateCallback = ({ url }: { url: string }) => void;
let beforePopState: BeforePopStateCallback;
const user = userEvent.setup();
const mockPush = jest.fn();
const mockBeforePopState = jest
  .fn()
  .mockImplementation((callback: BeforePopStateCallback) => {
    beforePopState = callback;
  });

const useRouter = jest.spyOn(router, "useRouter");
(useRouter as jest.Mock).mockImplementation(() => ({
  push: mockPush,
  beforePopState: mockBeforePopState,
}));

const mockRoomsResponse = {
  nextId: 4,
  rooms: [
    {
      id: 0,
      name: "room A",
    },
    {
      id: 1,
      name: "room B",
    },
    {
      id: 2,
      name: "room C",
    },
  ],
};

fetchMock.get("/api/rooms", {
  body: mockRoomsResponse,
});
const mockSaveTaskRequest = fetchMock.post("/api/saveTask", {});
const mockDeleteTaskRequest = fetchMock.delete("/api/deleteTask/1", {});

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetHistory();
});
test("Save new task", async () => {
  jest
    .useFakeTimers({
      doNotFake: ["setTimeout"],
    })
    .setSystemTime(new Date("11/17/2022"));

  const initialTask = new Task({ id: 3, roomId: 2 });
  renderWithQueryClient(
    <EditTaskForm initialTask={initialTask} pageOrigin="/fakeorigin" />
  );
  const nameInput = screen.getByLabelText("Name");
  expect(nameInput).toHaveValue("");
  await user.type(nameInput, "a new task name");
  expect(screen.getByLabelText("Name")).toHaveValue("a new task name");
  const roomCard = screen.getByText("Room: room C");
  expect(roomCard).toBeVisible();
  await user.click(roomCard);
  await user.click(screen.getByText("room A"));
  expect(screen.getByText("Room: room A")).toBeVisible();
  expect(screen.queryByText("Room: room C")).toBeNull();
  const frequencyInput = screen.getByDisplayValue("0");
  expect(frequencyInput).toBeVisible();
  await user.type(frequencyInput, "3");
  expect(screen.getByDisplayValue("3")).toBeVisible();
  const frequencyButton = screen.getByRole("button", {
    name: "weeks",
    hidden: true,
  });
  expect(frequencyButton).toBeVisible();
  await user.click(frequencyButton);
  await user.click(screen.getByRole("menuitem", { name: "months" }));
  expect(
    screen.getByRole("button", {
      name: "months",
      hidden: true,
    })
  ).toBeVisible();
  const dateInput = screen.getByDisplayValue("11/17/2022");
  expect(dateInput).toBeVisible();
  await user.click(dateInput);
  await user.click(screen.getByText("23"));
  expect(screen.getByDisplayValue("11/23/2022")).toBeVisible();

  await user.click(screen.getByText("Save"));

  const [, options] = mockSaveTaskRequest.lastCall("/api/saveTask") ?? [];
  expect(JSON.parse(options?.body as string)).toEqual({
    id: 3,
    name: "a new task name",
    roomId: 0,
    frequencyAmount: 3,
    frequencyType: "months",
    lastDone: new Date("11/23/2022").getTime(),
  });

  expect(mockPush).toBeCalledWith("/fakeorigin");
});
test("Existing task", async () => {
  jest
    .useFakeTimers({
      doNotFake: ["setTimeout"],
    })
    .setSystemTime(new Date("11/17/2022"));

  const initialTask = new Task({
    id: 1,
    name: "Test task",
    frequencyAmount: 4,
    frequencyType: Frequency.DAYS,
    lastDone: new Date("10/1/2022").getTime(),
    roomId: 0,
  });
  renderWithQueryClient(
    <EditTaskForm initialTask={initialTask} pageOrigin="fake.com" />
  );
  const nameInput = screen.getByLabelText("Name");
  expect(nameInput).toHaveValue("Test task");
  await user.type(nameInput, " with a different name");
  expect(screen.getByLabelText("Name")).toHaveValue(
    "Test task with a different name"
  );
  const roomCard = screen.getByText("Room: room A");
  expect(roomCard).toBeVisible();
  await user.click(roomCard);
  await user.click(screen.getByText("room B"));
  expect(screen.getByText("Room: room B")).toBeVisible();
  expect(screen.queryByText("Room: room A")).toBeNull();
  const frequencyInput = screen.getByDisplayValue("4");
  expect(frequencyInput).toBeVisible();
  await user.clear(frequencyInput);
  await user.type(frequencyInput, "1");
  expect(screen.getByDisplayValue("1")).toBeVisible();
  const frequencyButton = screen.getByRole("button", {
    name: "days",
    hidden: true,
  });
  expect(frequencyButton).toBeVisible();
  await user.click(frequencyButton);
  await user.click(screen.getByRole("menuitem", { name: "weeks" }));
  expect(
    screen.getByRole("button", {
      name: "weeks",
      hidden: true,
    })
  ).toBeVisible();
  const dateInput = screen.getByDisplayValue("10/01/2022");
  expect(dateInput).toBeVisible();
  await user.click(dateInput);
  await user.click(screen.getByText("14"));
  expect(screen.getByDisplayValue("11/14/2022")).toBeVisible();

  await user.click(screen.getByText("Save"));
  const [, options] = mockSaveTaskRequest.lastCall("/api/saveTask") ?? [];
  expect(JSON.parse(options?.body as string)).toEqual({
    id: 1,
    name: "Test task with a different name",
    roomId: 1,
    frequencyAmount: 1,
    frequencyType: "weeks",
    lastDone: new Date("11/14/2022").getTime(),
  });

  expect(mockPush).toBeCalledWith("fake.com");
});
test("Delete task", async () => {
  jest
    .useFakeTimers({
      doNotFake: ["setTimeout"],
    })
    .setSystemTime(new Date("11/17/2022"));

  const initialTask = new Task({
    id: 1,
    name: "Test task",
    frequencyAmount: 4,
    frequencyType: Frequency.DAYS,
    lastDone: new Date("10/1/2022").getTime(),
    roomId: 0,
  });

  renderWithQueryClient(
    <EditTaskForm initialTask={initialTask} pageOrigin="faker.org" />
  );

  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("No"));
  expect(mockDeleteTaskRequest.called("/api/deleteTask/1")).toBe(false);
  expect(mockPush).toBeCalledTimes(0);

  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("Yes"));

  expect(mockDeleteTaskRequest.called("/api/deleteTask/1")).toBe(true);

  expect(mockPush).toBeCalledWith("faker.org");
});
test("Save task error", async () => {
  const initialTask = new Task({ id: 1 });
  renderWithQueryClient(
    <EditTaskForm initialTask={initialTask} pageOrigin="" />
  );
  expect(screen.getByLabelText("Name")).toHaveValue("");

  await user.click(screen.getByText("Save"));
  expect(screen.getByText("You must enter a task name")).toBeVisible();
});
test("Discard changes - save", async () => {
  jest
    .useFakeTimers({
      doNotFake: ["setTimeout"],
    })
    .setSystemTime(new Date("11/17/2022"));

  const initialTask = new Task({
    id: 1,
    name: "Test task",
    frequencyAmount: 4,
    frequencyType: Frequency.DAYS,
    lastDone: new Date("10/1/2022").getTime(),
    roomId: 0,
  });
  renderWithQueryClient(
    <EditTaskForm initialTask={initialTask} pageOrigin="fake.com" />
  );
  await user.type(screen.getByLabelText("Name"), " with a different name");

  act(() => {
    beforePopState({ url: "fake/url" });
  });

  expect(screen.getByText("Save changes?"));
  await user.click(screen.getByText("Yes"));

  const [, options] = mockSaveTaskRequest.lastCall("/api/saveTask") ?? [];
  expect(JSON.parse(options?.body as string)).toEqual({
    id: 1,
    name: "Test task with a different name",
    roomId: 0,
    frequencyAmount: 4,
    frequencyType: "days",
    lastDone: new Date("10/1/2022").getTime(),
  });
  expect(mockPush).toBeCalledWith("fake/url");
});
test("Discard changes - don't save", async () => {
  jest
    .useFakeTimers({
      doNotFake: ["setTimeout"],
    })
    .setSystemTime(new Date("11/17/2022"));

  const initialTask = new Task({
    id: 1,
    name: "Test task",
    frequencyAmount: 4,
    frequencyType: Frequency.DAYS,
    lastDone: new Date("10/1/2022").getTime(),
    roomId: 0,
  });
  renderWithQueryClient(
    <EditTaskForm initialTask={initialTask} pageOrigin="fake.com" />
  );
  await user.type(screen.getByLabelText("Name"), " with a different name");

  act(() => {
    beforePopState({ url: "fake/url" });
  });

  expect(screen.getByText("Save changes?"));
  await user.click(screen.getByText("No"));

  expect(mockSaveTaskRequest.called("/api/saveTask")).toBe(false);
  expect(mockPush).toBeCalledWith("fake/url");
});
