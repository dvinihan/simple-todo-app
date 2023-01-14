import { render, screen } from "@testing-library/react";
import { ActionModal } from "../ActionModal";
import userEvent from "@testing-library/user-event";

test("Renders when open", async () => {
  const user = userEvent.setup();
  const onConfirm = jest.fn();
  const onDeny = jest.fn();
  const onClose = jest.fn();
  render(
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      onDeny={onDeny}
      open
      title="Fake title"
    />
  );
  expect(screen.getByText("Fake title")).toBeVisible();
  await user.click(screen.getByText("Yes"));
  expect(onConfirm).toBeCalledTimes(1);
  await user.click(screen.getByText("No"));
  expect(onDeny).toBeCalledTimes(1);
  await user.keyboard("[Escape]");
  expect(onClose).toBeCalledTimes(1);
});
test("Doesn't render when closed", () => {
  const onConfirm = jest.fn();
  const onDeny = jest.fn();
  const onClose = jest.fn();
  render(
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      onDeny={onDeny}
      open={false}
      title="Fake title"
    />
  );
  expect(screen.queryByText("Fake title")).not.toBeInTheDocument();
  expect(screen.queryByText("Yes")).not.toBeInTheDocument();
  expect(screen.queryByText("No")).not.toBeInTheDocument();
  expect(onConfirm).toBeCalledTimes(0);
  expect(onDeny).toBeCalledTimes(0);
  expect(onClose).toBeCalledTimes(0);
});
