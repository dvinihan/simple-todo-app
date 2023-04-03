import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";
import { useMarkCompleted } from "../queries/useMarkCompleted";
import { useSaveTask } from "../queries/useSaveTask";
import { useTasksQuery } from "../queries/useTasksQuery";
import { Task } from "../types";

type Props = {
  onClose: () => void;
  open: boolean;
};

export const NewTask = ({ onClose, open }: Props) => {
  const [task, setTask] = useState(new Task());

  const { mutate: save } = useSaveTask();

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newName = e.target.value;
    setTask((t) => ({ ...t, name: newName }));
  };

  const handleClick = () => {
    save(task);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>New Task</DialogTitle>
      <DialogContent>
        <Input onChange={handleChangeName} value={task?.name} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
