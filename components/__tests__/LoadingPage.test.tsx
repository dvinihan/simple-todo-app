import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../../util/test-utils";
import { LoadingPage } from "../LoadingPage";

it("Renders", () => {
  renderWithQueryClient(<LoadingPage />);
  expect(screen.getByText("Loading...")).toBeVisible();
});
