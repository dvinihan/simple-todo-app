import { Card, Typography } from "@mui/material";
import { formatDuration } from "date-fns";
import Link from "next/link";
import { EDIT_TASK_ROUTE } from "../constants";
import { ExtendedTask } from "../types";

type Props = {
  origin?: "home";
  tasksToDisplay: ExtendedTask[];
  title: string;
};

export const FocusedTaskList = ({ origin, tasksToDisplay, title }: Props) => {
  return tasksToDisplay.length > 0 ? (
    <Card
      sx={{
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "lightyellow",
      }}
    >
      <Typography fontSize={22}>{title}</Typography>
      {tasksToDisplay.map((task) => {
        let href = `${EDIT_TASK_ROUTE}?taskId=${task.id}`;
        if (origin === "home") {
          href = href.concat("&origin=home");
        }
        return (
          <Link
            data-testid={`focused-task-link`}
            href={href}
            key={task.id}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ padding: "6px", marginTop: "10px" }}>
              <Typography>
                <span style={{ fontWeight: "bold" }}>{task.name}</span> in{" "}
                <span style={{ fontWeight: "bold" }}>{task.roomName}, </span>
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
