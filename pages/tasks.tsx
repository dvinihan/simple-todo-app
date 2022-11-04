import { useRouter } from "next/router";
import { EDIT_ROOM_ROUTE, EDIT_TASK_ROUTE, HOME_ROUTE } from "../constants";
import { useTasksQuery } from "../hooks/useTasks";
import { getNumberUrlParam } from "../helpers/url";
import { Card, Container, Fab, Typography } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { NavBar } from "../components/NavBar";
import { useRoomsQuery } from "../hooks/useRooms";
import { FocusedTaskList } from "../components/FocusedTaskList";

const Tasks = () => {
  const router = useRouter();
  const urlRoomId = getNumberUrlParam(router.asPath, "roomId");

  const { tasks } = useTasksQuery();
  const { rooms } = useRoomsQuery();

  const tasksInRoom = tasks.filter((task) => task.roomId === urlRoomId);
  const roomName = rooms.find((room) => room.id === urlRoomId)?.name;

  if (urlRoomId === null) {
    router.push(HOME_ROUTE);
    return;
  }

  return (
    <>
      <NavBar title={roomName ?? ""} />
      <Container>
        <FocusedTaskList type="overdue" roomId={urlRoomId} />
        <FocusedTaskList type="upcoming" roomId={urlRoomId} />
        {tasksInRoom.map((task) => (
          <Card
            key={task.id}
            onClick={() => {
              router.push(`${EDIT_TASK_ROUTE}?taskId=${task.id}`);
            }}
            sx={{ marginTop: "10px" }}
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

export default Tasks;
