import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type DeleteModalProps = {
  onDelete: () => void;
  onClose: () => void;
  open: boolean;
  title: string;
};

export const DeleteModal = ({
  onDelete,
  onClose,
  open,
  title,
}: DeleteModalProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
          <Button onClick={onDelete}>Yes</Button>
          <Button onClick={onClose}>No</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
