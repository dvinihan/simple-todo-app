import { Card, Typography } from "@mui/material";
import { formatDuration } from "date-fns";
import Link from "next/link";
import { useMemo } from "react";
import { EDIT_TASK_ROUTE } from "../constants";
import { getDaysUntilDue, getFrequencyInDays } from "../helpers/tasks";
import { useRoomsQuery } from "../hooks/useRooms";
import { useTasksQuery } from "../hooks/useTasks";
import { TaskWithDaysUntilDue } from "../types";

type Props = {
  type: "upcoming" | "overdue";
  roomId?: number;
};

export const FocusedTaskList = ({ type, roomId }: Props) => {
  const { rooms } = useRoomsQuery();
  const { tasks } = useTasksQuery();

  const tasksWithDaysUntilDue: TaskWithDaysUntilDue[] = tasks
    .filter((t) => (roomId === undefined ? true : t.roomId === roomId))
    .map((t) => ({
      ...t,
      daysUntilDue: getDaysUntilDue(t),
    }));

  const filter = useMemo(
    () =>
      type === "upcoming"
        ? (t: TaskWithDaysUntilDue) =>
            t.daysUntilDue > 0 &&
            t.daysUntilDue <
              getFrequencyInDays(t.frequencyType, t.frequencyAmount) * 0.1
        : (t: TaskWithDaysUntilDue) => t.daysUntilDue <= 0,
    [type]
  );
  const qualifyingTasks = tasksWithDaysUntilDue.filter(filter);
  const sortedTasks = qualifyingTasks.sort(
    (a, b) => a.daysUntilDue - b.daysUntilDue
  );

  return qualifyingTasks.length > 0 ? (
    <Card
      sx={{
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "lightyellow",
      }}
    >
      <Typography fontSize={22}>
        {type === "upcoming" ? "Upcoming" : "Overdue"} tasks
      </Typography>
      {sortedTasks.map((task) => {
        const room = rooms.find((r) => r.id === task.roomId);
        return (
          <Link
            href={`${EDIT_TASK_ROUTE}?taskId=${task.id}&origin=${window.location.href}`}
            key={task.id}
          >
            <a
              data-testid={`task-${task.name}`}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ padding: "6px", marginTop: "10px" }}>
                <Typography>
                  <span style={{ fontWeight: "bold" }}>{task.name}</span> in{" "}
                  <span style={{ fontWeight: "bold" }}>{room?.name}, </span>
                  <span style={{ color: "red" }}>
                    {task.daysUntilDue === 0
                      ? "Due today"
                      : task.daysUntilDue > 0
                      ? `due in ${formatDuration({ days: task.daysUntilDue })}`
                      : `${formatDuration({
                          days: task.daysUntilDue * -1,
                        })} overdue`}
                  </span>
                </Typography>
              </Card>
            </a>
          </Link>
        );
      })}
    </Card>
  ) : null;
};
