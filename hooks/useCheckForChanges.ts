import { useRouter } from "next/router";
import { useEffect } from "react";
import { AppReducerActions } from "../context/types";
import { useAppContext } from "../context/use-app-context";

export const useCheckForChanges = () => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (state.hasChanges) {
        dispatch({
          type: AppReducerActions.OPEN_DISCARD_MODAL_ACTION,
          payload: {
            redirectUrl: url,
          },
        });
        return false;
      }
      return true;
    });
  }, [dispatch, router, state.hasChanges]);
};
