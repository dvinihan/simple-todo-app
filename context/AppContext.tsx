import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type DiscardModalState = {
  open: boolean;
  redirectUrl: string;
};

type AppContextState = {
  hasChanges: boolean;
  setHasChanges: Dispatch<SetStateAction<boolean>>;
  discardModalState: DiscardModalState;
  setDiscardModalState: Dispatch<SetStateAction<DiscardModalState>>;
};
export const AppContext = createContext<AppContextState | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [hasChanges, setHasChanges] = useState(false);
  const [discardModalState, setDiscardModalState] = useState<DiscardModalState>(
    { open: false, redirectUrl: "" }
  );

  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (hasChanges) {
        setDiscardModalState({ open: true, redirectUrl: url });
        return false;
      }
      return true;
    });
  }, [hasChanges, router, setDiscardModalState]);

  return (
    <AppContext.Provider
      value={{
        hasChanges,
        setHasChanges,
        discardModalState,
        setDiscardModalState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
