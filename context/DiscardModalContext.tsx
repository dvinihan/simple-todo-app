import { createContext, useState } from "react";

export type DiscardModalState = {
  show: boolean;
  action: () => void;
  hasChanges: boolean;
};

type DiscardModalContextState = {
  discardModalState: DiscardModalState;
  setDiscardModalState: (state: DiscardModalState) => void;
};

export const DiscardModalContext =
  createContext<DiscardModalContextState | null>(null);

export const DiscardModalProvider = ({ children }: { children: any }) => {
  const [discardModalState, setDiscardModalState] = useState<DiscardModalState>(
    { show: false, action: () => {}, hasChanges: false }
  );

  return (
    <DiscardModalContext.Provider
      value={{ discardModalState, setDiscardModalState }}
    >
      {children}
    </DiscardModalContext.Provider>
  );
};
