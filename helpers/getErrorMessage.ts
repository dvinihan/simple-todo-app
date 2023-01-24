export const getErrorMessage = (error: unknown) => {
  const hasMessage =
    typeof error === "object" && error !== null && "message" in error;
  return hasMessage ? String(error.message) : "";
};
