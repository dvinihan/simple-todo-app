import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQueryClient } from "../../util/test-utils";
import { PickerModal } from "../PickerModal";

const user = userEvent.setup();

test("All actions function and text is displayed", async () => {
  const onClose = jest.fn();
  const onSelect = jest.fn();
  renderWithQueryClient(
    <PickerModal
      onClose={onClose}
      onSelect={onSelect}
      open
      options={["option a", "option b", "option c"]}
    />
  );
  expect(screen.getByText("option a")).toBeVisible();
  expect(screen.getByText("option b")).toBeVisible();
  expect(screen.getByText("option c")).toBeVisible();
  await user.click(screen.getByText("option b"));
  expect(onSelect).toBeCalledWith("option b");

  await user.keyboard("[Escape]");
  expect(onClose).toBeCalledTimes(1);
});
test("does not render if not open", () => {
  const onClose = jest.fn();
  const onSelect = jest.fn();
  renderWithQueryClient(
    <PickerModal
      onClose={onClose}
      onSelect={onSelect}
      open={false}
      options={["option a", "option b", "option c"]}
    />
  );
  expect(screen.queryByText("option a")).toBeNull();
  expect(screen.queryByText("option b")).toBeNull();
  expect(screen.queryByText("option c")).toBeNull();
});
