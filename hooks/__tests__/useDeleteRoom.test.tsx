import { act, renderHook } from "@testing-library/react";
import { useEffect } from "react";
import { renderWithQueryClient } from "../../util/test-utils";
import { useDeleteRoom } from "../useDeleteRoom";

test("returns data", () => {
  global.fetch = jest.fn().mockImplementation(() => {
    console.log("calling fetch");
    return Promise.resolve({ json: () => Promise.resolve({ testValue: 4 }) });
  });

  const TestComponent = () => {
    const { mutate } = useDeleteRoom({});
    useEffect(() => {
      mutate(3);
    }, [mutate]);
    return null;
  };

  //   const result = renderHook(() => useDeleteRoom({}));
  act(() => {
    renderWithQueryClient(<TestComponent />);
  });
  // const mutateResult = result.result.current.mutate(3);
  expect(global.fetch).toBeCalledWith(`/api/deleteRoom/3`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  // expect(mutateResult).toBe({ testValue: 4 });
});
