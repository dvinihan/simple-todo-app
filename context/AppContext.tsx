import { createContext, ReactNode } from "react";

type AppContextState = {};
export const AppContext = createContext<AppContextState | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
