import { EDIT_ROOM_ROUTE, EDIT_TASK_ROUTE } from "../constants";
import { useTasksQuery } from "../hooks/useTasks";
import { Box, Fab } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { NavBar } from "../components/NavBar";
import { useRoomsQuery } from "../hooks/useRooms";
import { FocusedTaskList } from "../components/FocusedTaskList";
import Link from "next/link";
import { ListItem } from "../components/ListItem";
import { useRouter } from "next/router";
import { useIdParams } from "../hooks/useIdParams";
import { PageError } from "../components/PageError";
import { Loading } from "../components/Loading";

const Tasks = () => {
  const router = useRouter();
  const idParams = useIdParams();
  const { roomId } = idParams ?? {};

  const { tasks } = useTasksQuery();
  const { rooms } = useRoomsQuery();

  const tasksInRoom = tasks.filter((task) => task.roomId === roomId);
  const roomName = rooms.find((room) => room.id === roomId)?.name;

  if (!idParams) {
    // don't show anything until the url can be evaluated
    return <Loading />;
  }

  if (roomId === undefined) {
    return <PageError message={`No roomId param found`} />;
  }

  if (roomName === undefined) {
    return <PageError message={`No room with id ${roomId} found`} />;
  }

  return (
    <>
      <NavBar title={roomName} />
      <Box>
        <FocusedTaskList type="overdue" roomId={roomId} />
        <FocusedTaskList type="upcoming" roomId={roomId} />
        {tasksInRoom.map((task) => (
          <ListItem
            key={task.id}
            href={`${EDIT_TASK_ROUTE}?taskId=${task.id}`}
            text={task.name}
          />
        ))}
      </Box>
      <Fab sx={{ position: "fixed", right: "16px", bottom: "86px" }}>
        <Link href={`${EDIT_ROOM_ROUTE}?roomId=${roomId}`}>
          <Edit />
        </Link>
      </Fab>
      <Fab sx={{ position: "fixed", right: "16px", bottom: "16px" }}>
        <Link href={`${EDIT_TASK_ROUTE}?roomId=${roomId}`}>
          <Add />
        </Link>
      </Fab>
    </>
  );
};
export default Tasks;
