import { useRouter } from "next/router";
import { getParamValue } from "../helpers/url";

export const useIdParams = () => {
  const router = useRouter();

  const roomIdParam = getParamValue(router.query["roomId"]);
  const taskIdParam = getParamValue(router.query["taskId"]);

  return {
    roomId: roomIdParam === undefined ? undefined : Number(roomIdParam),
    taskId: taskIdParam === undefined ? undefined : Number(taskIdParam),
  };
};
