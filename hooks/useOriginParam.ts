import { useRouter } from "next/router";
import { getParamValue } from "../helpers/getParamValue";

export const useOriginParam = () => {
  const router = useRouter();
  const origin = getParamValue(router.query["origin"]);
  if (origin === "home") {
    return "home";
  }
  return undefined;
};
