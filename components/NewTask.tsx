import { Checkbox, Input } from "@mui/material";
import { useCallback, useState } from "react";
import { useMarkCompleted } from "../queries/useMarkCompleted";
import { useTasksQuery } from "../queries/useTasksQuery";
import { Task } from "../types";

export const NewTask = () => {
  const [task, setTask] = useState(new Task());

  return (
    <div>
      <Input value={task?.name} />
    </div>
  );
};
