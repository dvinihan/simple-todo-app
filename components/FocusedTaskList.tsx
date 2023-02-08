import { Card, Typography } from "@mui/material";
import { formatDuration } from "date-fns";
import Link from "next/link";
import { useMemo } from "react";
import { EDIT_TASK_ROUTE } from "../constants";
import { prepareTaskList } from "../helpers/prepareTaskList";
import { useRoomsQuery } from "../queries/useRooms";
import { useTasksQuery } from "../queries/useTasks";

type Props = {
  type: "upcoming" | "overdue";
  roomId?: number;
};

export const FocusedTaskList = ({ type, roomId }: Props) => {
  const { rooms } = useRoomsQuery();
  const { tasks } = useTasksQuery();

  const preparedTaskList = useMemo(
    () => prepareTaskList(type, tasks, roomId),
    [roomId, tasks, type]
  );

  return preparedTaskList.length > 0 ? (
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
      {preparedTaskList.map((task) => {
        const room = rooms.find((r) => r.id === task.roomId);
        return (
          <Link
            data-testid={`focused-task-link`}
            href={`${EDIT_TASK_ROUTE}?taskId=${task.id}&origin=${window.location.href}`}
            key={task.id}
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
          </Link>
        );
      })}
    </Card>
  ) : null;
};
