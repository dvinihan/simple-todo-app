import { useMutation, UseMutationOptions } from "react-query";

type MarkCompletedRequest = {
  _id: string;
  isCompleted: boolean;
};

export const useMarkCompleted = (
  options: UseMutationOptions<
    MarkCompletedRequest,
    unknown,
    MarkCompletedRequest
  > = {}
) =>
  useMutation(async (request: MarkCompletedRequest) => {
    const { _id, isCompleted } = request;
    const response = await fetch(`/api/editTask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, isCompleted }),
    });
    const data = await response.json();
    return data;
  }, options);
