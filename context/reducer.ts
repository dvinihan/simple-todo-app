import { Reducer } from "react";
import {
  AppContextState,
  AppReducerActions,
  AppReducerActionTypes,
  OpenDiscardModalAction,
  SetHasChangesAction,
} from "./types";

export const InitialAppContextState: AppContextState = {
  hasChanges: false,
  isDiscardModalOpen: false,
  redirectUrl: "",
};

export const appReducer: Reducer<AppContextState, AppReducerActionTypes> = (
  state,
  action
) => {
  switch (action.type) {
    case AppReducerActions.SET_HAS_CHANGES_ACTION: {
      return {
        ...state,
        hasChanges: (action as SetHasChangesAction).payload,
      };
    }
    case AppReducerActions.CLOSE_DISCARD_MODAL_ACTION: {
      return {
        ...state,
        isDiscardModalOpen: false,
      };
    }
    case AppReducerActions.OPEN_DISCARD_MODAL_ACTION: {
      return {
        ...state,
        isDiscardModalOpen: true,
        redirectUrl: (action as OpenDiscardModalAction).payload.redirectUrl,
      };
    }
    default: {
      return state;
    }
  }
};
