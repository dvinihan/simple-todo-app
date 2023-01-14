import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { renderWithQueryClient } from "../../util/test-utils";
import { ListItem } from "../ListItem";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/link", () => {
  const MockNextLink = ({ children }: { children: ReactNode }) => (
    <>{children}</>
  );
  return MockNextLink;
});

test("display clickable item", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  renderWithQueryClient(
    <ListItem href="/test" onClick={onClick} text="testing 123" />
  );
  const el = screen.getByText("testing 123");
  expect(el).toBeVisible();
  await user.click(el);
  expect(onClick).toHaveBeenCalledTimes(1);
});
