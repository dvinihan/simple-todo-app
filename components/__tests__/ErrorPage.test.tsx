import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../../util/test-utils";
import { ErrorPage } from "../ErrorPage";

test("Display error", async () => {
  renderWithQueryClient(<ErrorPage message="test message" />);
  expect(screen.getByText("test message")).toBeVisible();
});
