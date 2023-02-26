import { Checkbox } from "@mui/material";
import { useCallback } from "react";
import { useMarkCompleted } from "../queries/useMarkCompleted";
import { useTasksQuery } from "../queries/useTasksQuery";
import { Task } from "../types";

type Props = {
  task: Task;
};

export const TaskItem = ({ task }: Props) => {
  const { refetch } = useTasksQuery();
  const { mutate: markCompleted } = useMarkCompleted({
    onSuccess: () => {
      refetch();
    },
  });

  const handleCheck = useCallback(() => {
    markCompleted({ _id: task._id, isCompleted: true });
  }, [markCompleted, task._id]);

  return (
    <div>
      <Checkbox onClick={handleCheck} />
      {task.name}
    </div>
  );
};
