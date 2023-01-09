import { Room } from "../../types";
import { withQueryClient } from "../../util/test-utils";
import { EditRoomForm } from "../EditRoomForm";
import { act, screen, waitFor } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { TASKS_ROUTE } from "../../constants";
import nock from "nock";
import Router from "next/router";

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

  const saveRoomScope = nock("http://localhost:3000/api")
    .post("/saveRoom", { id: 3, name: "a new room name" })
    .reply(200, {});

  await user.click(screen.getByText("Save"));
  expect(saveRoomScope.isDone()).toBeTruthy();

  // effects in onSettled need to be waited for
  await waitFor(() => {
    expect(Router.asPath).toBe(`${TASKS_ROUTE}?roomId=3`);
  });
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

  const deleteRoomScope = nock("http://localhost:3000/api")
    .delete("/deleteRoom/1")
    .reply(200, {});

  withQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  Router.asPath = "/startingPath";
  expect(Router.asPath).toBe("/startingPath");
  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("No"));
  expect(Router.asPath).toBe("/startingPath");
  expect(deleteRoomScope.isDone()).toBeFalsy();
  await user.click(screen.getByTestId("DeleteIcon"));
  await user.click(screen.getByText("Yes"));
  expect(deleteRoomScope.isDone()).toBeTruthy();

  // effects in onSettled need to be waited for
  await waitFor(() => {
    expect(Router.asPath).toBe("/");
  });
});
it("Save changes on navigate away", async () => {
  const initialRoom = new Room({ id: 1, name: "Test room" });

  const saveRoomScope = nock("http://localhost:3000/api")
    .post("/saveRoom", { id: 1, name: "Test room abcd" })
    .reply(200, {});

  withQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  const nameInput = screen.getByLabelText("Name");
  await user.type(nameInput, " abcd");
  expect(screen.getByLabelText("Name")).toHaveValue("Test room abcd");

  await waitFor(async () => {
    Router.events.emit("routeChangeStart");

    expect(screen.getByText("Save changes?")).toBeVisible();
    await user.click(screen.getByText("Yes"));
    expect(saveRoomScope.isDone()).toBeTruthy();
  });
});
it("Don't save changes on navigate away", async () => {
  const initialRoom = new Room({ id: 1, name: "Test room" });

  const saveRoomScope = nock("http://localhost:3000/api")
    .post("/saveRoom", { id: 1, name: "Test room abcd" })
    .reply(200, {});

  withQueryClient(<EditRoomForm initialRoom={initialRoom} />);
  const nameInput = screen.getByLabelText("Name");
  await user.type(nameInput, " abcd");
  expect(screen.getByLabelText("Name")).toHaveValue("Test room abcd");

  await waitFor(async () => {
    Router.events.emit("routeChangeStart");

    expect(screen.getByText("Save changes?")).toBeVisible();
    await user.click(screen.getByText("No"));
    expect(saveRoomScope.isDone()).toBeFalsy();
  });
});
