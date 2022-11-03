import { editTaskTitle, EDIT_TASK_ROUTE } from "../constants";
import { useTasksQuery } from "../hooks/useTasks";
import { TaskWithDaysUntilDue } from "../types";
import { useRoomsQuery } from "../hooks/useRooms";
import { getDaysUntilDue } from "../helpers/tasks";
import { formatDuration } from "date-fns";
import { Card, Typography } from "@mui/material";
import Link from "next/link";

type Props = {
  roomId?: number;
};

export const OverdueTasks = ({ roomId }: Props) => {
  const { tasks } = useTasksQuery();
  const { rooms } = useRoomsQuery();

  const tasksWithOverdueness: TaskWithDaysUntilDue[] = tasks
    .filter((t) => (roomId === undefined ? true : t.roomId === roomId))
    .map((t) => ({
      ...t,
      daysUntilDue: getDaysUntilDue(t),
    }));

  const isTaskOverdue = (t: TaskWithDaysUntilDue) => t.daysUntilDue <= 0;
  const hasOverdueTasks = tasksWithOverdueness.some(isTaskOverdue);
  const overdueTasks = tasksWithOverdueness
    .filter(isTaskOverdue)
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue);

  return hasOverdueTasks ? (
    <Card
      sx={{
        marginTop: "10px",
        marginHorizontal: "10px",
        padding: "10px",
        backgroundColor: "lightyellow",
      }}
    >
      <Typography>Overdue tasks:</Typography>
      {overdueTasks.map((task) => {
        const room = rooms.find((r) => r.id === task.roomId);
        return (
          <Card key={task.id} sx={{ padding: "6px", marginVertical: "6px" }}>
            <Link
              href={`${EDIT_TASK_ROUTE}?taskId=${task.id}&title=${editTaskTitle}`}
            >
              <>
                <Typography>
                  <span style={{ fontWeight: "bold" }}>{task.name}</span> in{" "}
                  <span style={{ fontWeight: "bold" }}>{room?.name}, </span>
                  <span style={{ color: "red" }}>
                    {task.daysUntilDue === 0
                      ? "Due today"
                      : `${formatDuration({
                          days: task.daysUntilDue * -1,
                        })} overdue`}
                  </span>
                </Typography>
              </>
            </Link>
          </Card>
        );
      })}
    </Card>
  ) : null;
};
