import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { AppReducerActions } from "../context/types";
import { useAppContext } from "../context/use-app-context";

type DiscardModalProps = {
  onSave: (redirectUrl: string) => void;
};

export const DiscardModal = ({ onSave }: DiscardModalProps) => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const handleClose = useCallback(() => {
    dispatch({
      type: AppReducerActions.CLOSE_DISCARD_MODAL_ACTION,
    });
  }, [dispatch]);

  const handleConfirm = useCallback(() => {
    onSave(state.redirectUrl);
    dispatch({
      type: AppReducerActions.CLOSE_DISCARD_MODAL_ACTION,
    });
  }, [dispatch, onSave, state.redirectUrl]);

  const handleDeny = useCallback(() => {
    dispatch({
      type: AppReducerActions.CLOSE_DISCARD_MODAL_ACTION,
    });
    dispatch({
      type: AppReducerActions.SET_HAS_CHANGES_ACTION,
      payload: false,
    });
    router.push(state.redirectUrl);
  }, [dispatch, router, state.redirectUrl]);

  return (
    <Dialog onClose={handleClose} open={state.isDiscardModalOpen}>
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
