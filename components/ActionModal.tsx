import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type Props = {
  onConfirm: () => void;
  onDeny: () => void;
  open: boolean;
  title: string;
};

export const ActionModal = ({ onConfirm, onDeny, open, title }: Props) => {
  return (
    <Dialog onClose={onDeny} open={open}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
          <Button onClick={onConfirm}>Yes</Button>
          <Button onClick={onDeny}>No</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
