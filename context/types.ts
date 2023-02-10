export type AppContextState = {
  hasChanges: boolean;
  isDiscardModalOpen: boolean;
  redirectUrl: string;
};

export const AppReducerActions = {
  SET_HAS_CHANGES_ACTION: "SET_HAS_CHANGES_ACTION",
  CLOSE_DISCARD_MODAL_ACTION: "CLOSE_DISCARD_MODAL_ACTION",
  OPEN_DISCARD_MODAL_ACTION: "OPEN_DISCARD_MODAL_ACTION",
  SET_REDIRECT_URL_ACTION: "SET_REDIRECT_URL_ACTION",
};

export type SetHasChangesAction = {
  type: typeof AppReducerActions.SET_HAS_CHANGES_ACTION;
  payload: boolean;
};

export type CloseDiscardModalAction = {
  type: typeof AppReducerActions.CLOSE_DISCARD_MODAL_ACTION;
};

export type OpenDiscardModalAction = {
  type: typeof AppReducerActions.OPEN_DISCARD_MODAL_ACTION;
  payload: {
    redirectUrl: string;
  };
};

export type SetRedirectUrlAction = {
  type: typeof AppReducerActions.SET_REDIRECT_URL_ACTION;
  payload: string;
};

export type AppReducerActionTypes =
  | SetHasChangesAction
  | CloseDiscardModalAction
  | OpenDiscardModalAction
  | SetRedirectUrlAction;
