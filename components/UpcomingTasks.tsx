import { editTaskTitle, EDIT_TASK_ROUTE } from "../constants";
import { useTasksQuery } from "../hooks/useTasks";
import { TaskWithDaysUntilDue } from "../types";
import { useRoomsQuery } from "../hooks/useRooms";
import { getDaysUntilDue, getFrequencyInDays } from "../helpers/tasks";
import { formatDuration } from "date-fns";
import { Card, Typography } from "@mui/material";
import Link from "next/link";

type Props = {
  roomId?: number;
};

export const UpcomingTasks = ({ roomId }: Props) => {
  const { tasks } = useTasksQuery();
  const { rooms } = useRoomsQuery();

  const taskWithDaysToGo: TaskWithDaysUntilDue[] = tasks
    .filter((t) => (roomId === undefined ? true : t.roomId === roomId))
    .map((t) => ({
      ...t,
      daysUntilDue: getDaysUntilDue(t),
    }));

  const isTaskDueSoon = (t: TaskWithDaysUntilDue) =>
    t.daysUntilDue > 0 &&
    t.daysUntilDue <
      getFrequencyInDays(t.frequencyType, t.frequencyAmount) * 0.1;
  const hasDueSoonTasks = taskWithDaysToGo.some(isTaskDueSoon);
  const dueSoonTasks = taskWithDaysToGo
    .filter(isTaskDueSoon)
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue);

  return hasDueSoonTasks ? (
    <Card
      sx={{
        marginTop: "10px",
        marginHorizontal: "10px",
        padding: "10px",
        backgroundColor: "lightyellow",
      }}
    >
      <Typography>Upcoming tasks:</Typography>
      {dueSoonTasks.map((task) => {
        const room = rooms.find((r) => r.id === task.roomId);
        return (
          <Card
            key={task.id}
            style={{ padding: "6px", marginTop: "6px", marginBottom: "6px" }}
          >
            <Link
              href={`/${EDIT_TASK_ROUTE}?taskId=${task.id}&title=${editTaskTitle}`}
            >
              <Typography sx={{ fontWeight: "bold" }}>{task.name}</Typography>
              <Typography> in </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {room?.name},{" "}
              </Typography>
              <Typography>
                due in {formatDuration({ days: task.daysUntilDue })}
              </Typography>
            </Link>
          </Card>
        );
      })}
    </Card>
  ) : null;
};
