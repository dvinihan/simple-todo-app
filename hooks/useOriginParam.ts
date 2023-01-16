import { useRouter } from "next/router";
import { HOME_ROUTE } from "../constants";
import { getParamValue } from "../helpers/getParamValue";

export const useOriginParam = () => {
  const router = useRouter();
  return getParamValue(router.query["origin"]) ?? HOME_ROUTE;
};
