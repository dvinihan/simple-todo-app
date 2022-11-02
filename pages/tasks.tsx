import { useRouter } from "next/router";
import { editTaskTitle, EDIT_ROOM_ROUTE, EDIT_TASK_ROUTE } from "../constants";
import { useTasksQuery } from "../hooks/useTasks";
import { OverdueTasks } from "../components/OverdueTasks";
import { UpcomingTasks } from "../components/UpcomingTasks";
import { getRoomIdFromUrl } from "../helpers/url";
import { Card, Container, Fab, Typography } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";

export const Tasks = () => {
  const router = useRouter();
  const urlRoomId = getRoomIdFromUrl(router.query);

  const { tasks } = useTasksQuery();

  const tasksInRoom = tasks.filter((task) => task.roomId === urlRoomId);

  return (
    <>
      <Container>
        <OverdueTasks roomId={urlRoomId} />
        <UpcomingTasks roomId={urlRoomId} />
        {tasksInRoom.map((task) => (
          <Card
            key={task.id}
            onClick={() => {
              router.push(
                `${EDIT_TASK_ROUTE}?taskId=${task.id}&title=${editTaskTitle}`
              );
            }}
            sx={{ marginTop: "10px", marginHorizontal: "10px" }}
            variant="outlined"
          >
            <Typography title={task.name} />
          </Card>
        ))}
      </Container>
      <Fab
        onClick={() => {
          router.push(`${EDIT_TASK_ROUTE}?title=New Task&roomId=${urlRoomId}`);
        }}
        sx={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
      >
        <Add />
      </Fab>
      <Fab
        onClick={() => {
          router.push(`${EDIT_ROOM_ROUTE}?title=Edit Room&roomId=${urlRoomId}`);
        }}
        sx={{ position: "absolute", margin: 16, right: 72, bottom: 0 }}
      >
        <Edit />
      </Fab>
    </>
  );
};
