import { getParamValue } from "../getParamValue";

test.each([
  [undefined, undefined],
  [["testing123"], "testing123"],
  ["testurl", "testurl"],
])("%s", (a, expected) => {
  expect(getParamValue(a)).toBe(expected);
});
