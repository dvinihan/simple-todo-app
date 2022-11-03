export const getStringUrlParam = (
  url: string | undefined,
  paramName: string
) => {
  const searchParams = new URL(url ?? "").searchParams;
  return searchParams.get(paramName) ?? "";
};

export const getNumberUrlParam = (
  url: string | undefined,
  paramName: string
) => {
  const stringUrlParam = getStringUrlParam(url, paramName);
  return stringUrlParam ? Number(stringUrlParam) : null;
};
