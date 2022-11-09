import { useRouter } from "next/router";
import { getParamValue } from "../helpers/url";

export const useIdParams = () => {
  const router = useRouter();

  const roomIdParam = getParamValue(router.query["roomId"]);
  const taskIdParam = getParamValue(router.query["taskId"]);
  const nextIdParam = getParamValue(router.query["nextId"]);

  return {
    roomId: roomIdParam === undefined ? undefined : Number(roomIdParam),
    taskId: taskIdParam === undefined ? undefined : Number(taskIdParam),
    nextId: nextIdParam === undefined ? undefined : Number(nextIdParam),
  };
};
