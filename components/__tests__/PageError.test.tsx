import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../../util/test-utils";
import { PageError } from "../PageError";

test("Renders", () => {
  renderWithQueryClient(<PageError message="this is an error" />);
  expect(screen.getByText("Oops..... this is an error")).toBeVisible();
});
