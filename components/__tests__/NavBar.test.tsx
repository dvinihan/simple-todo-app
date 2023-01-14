import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../../util/test-utils";
import { NavBar } from "../NavBar";

it("Renders", () => {
  renderWithQueryClient(<NavBar title="testing the navbar" />);
  expect(screen.getByText("testing the navbar")).toBeVisible();
});