import { ParsedUrlQuery } from "querystring";

export const getNumberUrlParam = (
  urlQuery: ParsedUrlQuery,
  paramName: string
) => {
  const stringUrlParam = urlQuery[paramName];
  switch (typeof stringUrlParam) {
    case "string":
      return Number(stringUrlParam);
    case "object":
      return Number(stringUrlParam[0]);
    default:
      return undefined;
  }
};
