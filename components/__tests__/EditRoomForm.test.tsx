import { Room } from "../../types";
import { renderWithQueryClient } from "../../util/test-utils";
import { EditRoomForm } from "../EditRoomForm";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TASKS_ROUTE } from "../../constants";
import fetchMock from "fetch-mock";

type BeforePopStateCallback = ({ url }: { url: string }) => void;
let beforePopState: BeforePopStateCallback;
const user = userEvent.setup();
const mockPush = jest.fn();
const mockBeforePopState = jest
  .fn()
  .mockImplementation((callback: BeforePopStateCallback) => {
    beforePopState = callback;
  });

const useRouter = jest.spyOn(require("next/router"), "useRouter");
(useRouter as jest.Mock).mockImplementation(() => ({
  push: mockPush,
  beforePopState: mockBeforePopState,
}));

const mockSaveRoomRequest = fetchMock.post("/api/saveRoom", {});
const mockDeleteRoomRequest = fetchMock.delete("/api/deleteRoom/1", {});

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetHistory();
});
test("Save new room", async () => {
  const initialRoom = new Room({ id: 3 });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  const nameInput = screen.getByLabelText("Name");
  expect(nameInput).toHaveValue("");
  await user.type(nameInput, "a new room name");
  expect(screen.getByLabelText("Name")).toHaveValue("a new room name");

  await user.click(screen.getByText("Save"));

  const [_, options] = mockSaveRoomRequest.lastCall("/api/saveRoom") ?? [];
  expect(options?.body).toEqual(
    JSON.stringify({
      id: 3,
      name: "a new room name",
    })
  );

  expect(mockPush).toBeCalledWith(`${TASKS_ROUTE}?roomId=3`);
});
test("Existing room", async () => {
  const initialRoom = new Room({ id: 1, name: "Test room" });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  const nameInput = screen.getByLabelText("Name");
  expect(nameInput).toHaveValue("Test room");
  await user.type(nameInput, " with a different name");
  expect(screen.getByLabelText("Name")).toHaveValue(
    "Test room with a different name"
  );
});
test("Delete room", async () => {
  const initialRoom = new Room({ id: 1, name: "Test room" });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("No"));

  expect(mockDeleteRoomRequest.called("/api/deleteRoom/1")).toBe(false);

  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("Yes"));

  expect(mockDeleteRoomRequest.called("/api/deleteRoom/1")).toBe(true);

  expect(mockPush).toBeCalledWith("/");
});
test("Save room error", async () => {
  const initialRoom = new Room({ id: 1 });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  expect(screen.getByLabelText("Name")).toHaveValue("");

  await user.click(screen.getByText("Save"));
  expect(screen.getByText("You must enter a room name")).toBeVisible();
});
test("Discard modal - save changes", async () => {
  const initialRoom = new Room({ id: 1 });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);

  await user.type(screen.getByLabelText("Name"), "test room");
  act(() => {
    beforePopState({ url: "/test/url" });
  });
  expect(screen.getByText("Save changes?")).toBeVisible();
  await user.click(screen.getByText("Yes"));

  const [_, options] = mockSaveRoomRequest.lastCall("/api/saveRoom") ?? [];
  expect(JSON.parse(options?.body as string)).toEqual({
    id: 1,
    name: "test room",
  });
  expect(mockPush).toBeCalledWith("/test/url");
});
test("Discard modal - don't save changes", async () => {
  const initialRoom = new Room({ id: 1 });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);

  await user.type(screen.getByLabelText("Name"), "test room");
  act(() => {
    beforePopState({ url: "/test/url" });
  });
  expect(screen.getByText("Save changes?")).toBeVisible();
  await user.click(screen.getByText("No"));

  expect(mockSaveRoomRequest.called()).toBe(false);
  expect(mockPush).toBeCalledWith("/test/url");
});
