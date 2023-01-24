import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useAppContext } from "../context/use-app-context";

type DiscardModalProps = {
  onSave: () => void;
};

export const DiscardModal = ({ onSave }: DiscardModalProps) => {
  const router = useRouter();
  const { discardModalState, setDiscardModalState, setHasChanges } =
    useAppContext();

  const handleClose = useCallback(() => {
    setDiscardModalState((state) => ({ ...state, open: false }));
  }, [setDiscardModalState]);

  const handleConfirm = useCallback(() => {
    onSave();
    router.push(discardModalState.redirectUrl);
    setDiscardModalState({ open: false, redirectUrl: "" });
  }, [discardModalState.redirectUrl, onSave, router, setDiscardModalState]);

  const handleDeny = useCallback(() => {
    setDiscardModalState({ open: false, redirectUrl: "" });
    setHasChanges(false);
    router.push(discardModalState.redirectUrl);
  }, [
    discardModalState.redirectUrl,
    router,
    setDiscardModalState,
    setHasChanges,
  ]);

  return (
    <Dialog onClose={handleClose} open={discardModalState.open}>
      <DialogContent>
        <DialogTitle>Save changes?</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirm}>Yes</Button>
          <Button onClick={handleDeny}>No</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
