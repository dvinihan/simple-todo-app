import { Room } from "../../types";
import { renderWithQueryClient } from "../../util/test-utils";
import { EditRoomForm } from "../EditRoomForm";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TASKS_ROUTE } from "../../constants";
import Router from "next/router";
import { useSaveRoom } from "../../hooks/useSaveRoom";
import { useDeleteRoom } from "../../hooks/useDeleteRoom";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("../../hooks/useSaveRoom");
jest.mock("../../hooks/useDeleteRoom");

const user = userEvent.setup();
const mockSaveRoom = jest.fn();
const mockDeleteRoom = jest.fn();

beforeEach(() => {
  (useSaveRoom as jest.Mock).mockReturnValue({
    mutate: mockSaveRoom,
    isLoading: false,
  });
  (useDeleteRoom as jest.Mock).mockReturnValue({ mutate: mockDeleteRoom });
});
it("Save new room", async () => {
  const initialRoom = new Room({ id: 3 });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  const nameInput = screen.getByLabelText("Name");
  expect(nameInput).toHaveValue("");
  await user.type(nameInput, "a new room name");
  expect(screen.getByLabelText("Name")).toHaveValue("a new room name");

  await user.click(screen.getByText("Save"));

  expect(mockSaveRoom).toBeCalledWith({
    id: 3,
    name: "a new room name",
  });

  // TODO
  // expect(Router.asPath).toBe(`${TASKS_ROUTE}?roomId=3`);
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
  const initialRoom = new Room({ id: 1, name: "Test room" });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  // Router.asPath = "/startingPath";
  // expect(Router.asPath).toBe("/startingPath");
  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("No"));
  // expect(Router.asPath).toBe("/startingPath");

  expect(mockDeleteRoom).toBeCalledTimes(0);
  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("Yes"));
  expect(mockDeleteRoom).toBeCalledTimes(1);

  // TODO
  // expect(Router.asPath).toBe("/");
});
it("Save room error", async () => {
  const initialRoom = new Room({ id: 1 });
  renderWithQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  expect(screen.getByLabelText("Name")).toHaveValue("");

  await user.click(screen.getByText("Save"));
  expect(screen.getByText("You must enter a room name")).toBeVisible();
});
