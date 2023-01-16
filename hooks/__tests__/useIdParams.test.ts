import { renderHook } from "@testing-library/react";
import { getParamValue } from "../../helpers/getParamValue";
import { useIdParams } from "../useIdParams";

jest.mock("../../helpers/getParamValue.ts");

const useRouter = jest.spyOn(require("next/router"), "useRouter");

beforeEach(() => {
  jest.clearAllMocks();
});
test("has neither id param", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: {},
  }));
  (getParamValue as jest.Mock).mockReturnValue(undefined);

  const result = renderHook(useIdParams);
  expect(result.result.current).toEqual({
    roomId: undefined,
    taskId: undefined,
  });
  expect(getParamValue).toBeCalledWith(undefined);
  expect(getParamValue).toBeCalledTimes(2);
});
test("has room id but no task id", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: { roomId: "4" },
  }));
  (getParamValue as jest.Mock).mockReturnValueOnce("4");
  (getParamValue as jest.Mock).mockReturnValueOnce(undefined);

  const result = renderHook(useIdParams);
  expect(result.result.current).toEqual({
    roomId: 4,
    taskId: undefined,
  });
  expect(getParamValue).toBeCalledWith("4");
  expect(getParamValue).toBeCalledWith(undefined);
  expect(getParamValue).toBeCalledTimes(2);
});
test("has task id but no room id", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: { taskId: "9" },
  }));
  (getParamValue as jest.Mock).mockReturnValueOnce(undefined);
  (getParamValue as jest.Mock).mockReturnValueOnce("9");

  const result = renderHook(useIdParams);
  expect(result.result.current).toEqual({
    roomId: undefined,
    taskId: 9,
  });
  expect(getParamValue).toBeCalledWith("9");
  expect(getParamValue).toBeCalledWith(undefined);
  expect(getParamValue).toBeCalledTimes(2);
});
test("has both room id and task id", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: { roomId: "4", taskId: "0" },
  }));
  (getParamValue as jest.Mock).mockReturnValueOnce("4");
  (getParamValue as jest.Mock).mockReturnValueOnce("0");

  const result = renderHook(useIdParams);
  expect(result.result.current).toEqual({
    roomId: 4,
    taskId: 0,
  });
  expect(getParamValue).toBeCalledWith("4");
  expect(getParamValue).toBeCalledWith("0");
  expect(getParamValue).toBeCalledTimes(2);
});
