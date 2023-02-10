import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { appReducer, InitialAppContextState } from "./reducer";
import { AppContextState, AppReducerActionTypes } from "./types";

type AppContextType = {
  state: AppContextState;
  dispatch: Dispatch<AppReducerActionTypes>;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, InitialAppContextState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
