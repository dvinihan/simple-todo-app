export const getParamValue = (param: string | string[] | undefined) => {
  switch (typeof param) {
    case "undefined":
      return undefined;
    case "object":
      return param[0];
    default:
      return param;
  }
};
