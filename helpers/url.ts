export const getNumberUrlParam = (url: URL, paramName: string) => {
  const stringUrlParam = url.searchParams.get(paramName);
  return stringUrlParam === null ? undefined : Number(stringUrlParam);
};
