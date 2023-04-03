import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTasksQuery } from "../queries/useTasksQuery";
import { Section } from "../types";
import { TaskItem } from "./TaskItem";

type Props = {
  section: Section;
};

export const TaskSection = ({ section }: Props) => {
  const { data: allTasks } = useTasksQuery();

  const sectionTasks = useMemo(
    () =>
      allTasks?.filter(
        (task) => task.sectionId === section._id && !task.isCompleted
      ),
    [allTasks, section._id]
  );

  return (
    <Box sx={{ margin: "20px 0" }}>
      <Typography key={section._id} variant="h4">
        {section.name}
      </Typography>
      {sectionTasks?.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
      <hr />
    </Box>
  );
};
