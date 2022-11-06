import { useRouter } from "next/router";

export const useIdParams = () => {
  const router = useRouter();

  // don't check on the server because router.query will not be present: https://nextjs.org/docs/api-reference/next/router#router-object
  if (!router.isReady) {
    return undefined;
  }

  const roomIdParam = getParamValue(router.query["roomId"]);
  const taskIdParam = getParamValue(router.query["taskId"]);

  return {
    roomId: roomIdParam === undefined ? undefined : Number(roomIdParam),
    taskId: taskIdParam === undefined ? undefined : Number(taskIdParam),
  };
};

const getParamValue = (param: string | string[] | undefined) => {
  switch (typeof param) {
    case "undefined":
      return undefined;
    case "object":
      return param[0];
    default:
      return param;
  }
};
