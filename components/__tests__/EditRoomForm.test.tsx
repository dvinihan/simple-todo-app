import { Room } from "../../types";
import { withQueryClient } from "../../util/test-utils";
import { EditRoomForm } from "../EditRoomForm";
import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { TASKS_ROUTE } from "../../constants";
import Router from "next/router";
import fetchMock from "fetch-mock";

jest.mock("next/router", () => require("next-router-mock"));

let user: UserEvent;
beforeAll(() => {
  user = userEvent.setup();
});
it("Save new room", async () => {
  const initialRoom = new Room({ id: 3 });
  withQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  const nameInput = screen.getByLabelText("Name");
  expect(nameInput).toHaveValue("");
  await user.type(nameInput, "a new room name");
  expect(screen.getByLabelText("Name")).toHaveValue("a new room name");

  fetchMock.post(/api\/saveRoom/, {}).post("/saveRoom", {});
  await user.click(screen.getByText("Save"));

  const [_, options] = fetchMock.lastCall(/api\/saveRoom/) ?? [];
  expect(JSON.parse(options?.body as string)).toEqual({
    id: 3,
    name: "a new room name",
  });

  expect(Router.asPath).toBe(`${TASKS_ROUTE}?roomId=3`);
});
it("Existing room", async () => {
  const initialRoom = new Room({ id: 1, name: "Test room" });
  withQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  const nameInput = screen.getByLabelText("Name");
  expect(nameInput).toHaveValue("Test room");
  await user.type(nameInput, " with a different name");
  expect(screen.getByLabelText("Name")).toHaveValue(
    "Test room with a different name"
  );
});
it("Delete room", async () => {
  const initialRoom = new Room({ id: 1, name: "Test room" });

  fetchMock.delete(/api\/deleteRoom\/1/, {});

  withQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  Router.asPath = "/startingPath";
  expect(Router.asPath).toBe("/startingPath");
  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("No"));
  expect(Router.asPath).toBe("/startingPath");

  expect(fetchMock.called(/api\/deleteRoom\/1/)).toBe(false);
  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("Yes"));
  expect(fetchMock.called(/api\/deleteRoom\/1/)).toBe(true);

  expect(Router.asPath).toBe("/");
});
