import { renderHook } from "@testing-library/react";
import { HOME_ROUTE } from "../../constants";
import { useOriginParam } from "../useOriginParam";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

test("returns origin param", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: { origin: "test.com" },
  }));
  const result = renderHook(useOriginParam);
  expect(result.result.current).toBe("test.com");
});

test("returns home route if no origin param", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: {},
  }));
  const result = renderHook(useOriginParam);
  expect(result.result.current).toBe(HOME_ROUTE);
});
