import { Checkbox } from "@mui/material";
import { useCallback, useState } from "react";
import { useMarkCompleted } from "../queries/useMarkCompleted";
import { useTasksQuery } from "../queries/useTasksQuery";
import { Task } from "../types";
import Modal from "react-modal";
import { EditTask } from "./EditTask";

type Props = {
  task: Task;
};

Modal.setAppElement("#__next");

export const TaskItem = ({ task }: Props) => {
  const { refetch } = useTasksQuery();
  const { mutate: markCompleted } = useMarkCompleted({
    onSuccess: () => {
      refetch();
    },
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCheck = useCallback(() => {
    markCompleted({ _id: task._id, isCompleted: true });
  }, [markCompleted, task._id]);

  const handleClick = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  return (
    <>
      <div onClick={handleClick}>
        <Checkbox onClick={handleCheck} />
        {task.name}
      </div>
      <Modal isOpen={isEditModalOpen} onRequestClose={handleClose}>
        <EditTask task={task} />
      </Modal>
    </>
  );
};
