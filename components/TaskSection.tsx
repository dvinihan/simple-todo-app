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
    <div>
      <h3 key={section._id}>{section.name}</h3>
      {sectionTasks?.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
      <hr />
    </div>
  );
};
