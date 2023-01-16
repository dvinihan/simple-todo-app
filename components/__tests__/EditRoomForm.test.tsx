import { Room } from "../../types";
import { renderWithQueryClient } from "../../util/test-utils";
import { EditRoomForm } from "../EditRoomForm";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TASKS_ROUTE } from "../../constants";
import fetchMock from "fetch-mock";

const user = userEvent.setup();
const mockPush = jest.fn();
const mockBeforePopState = jest.fn();

const useRouter = jest.spyOn(require("next/router"), "useRouter");
(useRouter as jest.Mock).mockImplementation(() => ({
  push: mockPush,
  beforePopState: mockBeforePopState,
}));

it("Save new room", async () => {
  const mockRequest = fetchMock.post("/api/saveRoom", { body: {} });

  const initialRoom = new Room({ id: 3 });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  const nameInput = screen.getByLabelText("Name");
  expect(nameInput).toHaveValue("");
  await user.type(nameInput, "a new room name");
  expect(screen.getByLabelText("Name")).toHaveValue("a new room name");

  await user.click(screen.getByText("Save"));

  const [_, options] = mockRequest.lastCall("/api/saveRoom") ?? [];
  expect(options?.body).toEqual(
    JSON.stringify({
      id: 3,
      name: "a new room name",
    })
  );

  expect(mockPush).toBeCalledWith(`${TASKS_ROUTE}?roomId=3`);
});
it("Existing room", async () => {
  const initialRoom = new Room({ id: 1, name: "Test room" });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  const nameInput = screen.getByLabelText("Name");
  expect(nameInput).toHaveValue("Test room");
  await user.type(nameInput, " with a different name");
  expect(screen.getByLabelText("Name")).toHaveValue(
    "Test room with a different name"
  );
});
it("Delete room", async () => {
  const mockRequest = fetchMock.delete("/api/deleteRoom/1", { body: {} });

  const initialRoom = new Room({ id: 1, name: "Test room" });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("No"));

  expect(mockRequest.lastCall("/api/deleteRoom")).toBeUndefined();

  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("Yes"));

  expect(mockRequest.called()).toBe(true);

  expect(mockPush).toBeCalledWith("/");
});
it("Save room error", async () => {
  const initialRoom = new Room({ id: 1 });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  expect(screen.getByLabelText("Name")).toHaveValue("");

  await user.click(screen.getByText("Save"));
  expect(screen.getByText("You must enter a room name")).toBeVisible();
});
