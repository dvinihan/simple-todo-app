import { ActionButton } from "../ActionButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("Renders", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<ActionButton color="info" onClick={onClick} text="Do an action!" />);
  await user.click(screen.getByText("Do an action!"));
  expect(onClick).toBeCalledTimes(1);
});
