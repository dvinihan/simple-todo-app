import { Frequency } from "../../constants";
import { getFrequencyInDays } from "../getFrequencyInDays";

describe("getFrequencyInDays", () => {
  test.each([
    [Frequency.DAYS, 3, 3],
    [Frequency.WEEKS, 6, 42],
    [Frequency.MONTHS, 2, 62],
    [Frequency.YEARS, 1, 365],
  ])("%s - %s", (a, b, expected) => {
    expect(getFrequencyInDays(a, b)).toBe(expected);
  });
});
