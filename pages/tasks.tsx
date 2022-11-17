import { EDIT_ROOM_ROUTE, EDIT_TASK_ROUTE, NEW_TASK_ROUTE } from "../constants";
import { useTasksQuery } from "../hooks/useTasks";
import { Box, Fab } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useRoomsQuery } from "../hooks/useRooms";
import { FocusedTaskList } from "../components/FocusedTaskList";
import Link from "next/link";
import { ListItem } from "../components/ListItem";
import { useIdParams } from "../hooks/useIdParams";
import { PageError } from "../components/PageError";
import { LoadingPage } from "../components/LoadingPage";
import { useRouter } from "next/router";

const Tasks = () => {
  const router = useRouter();
  const { roomId } = useIdParams();

  const { tasks } = useTasksQuery();
  const { rooms } = useRoomsQuery();

  const tasksInRoom = tasks.filter((task) => task.roomId === roomId);
  const roomName = rooms.find((room) => room.id === roomId)?.name;

  if (!router.isReady) {
    return <LoadingPage />;
  }

  if (roomId === undefined) {
    return <PageError message={`No roomId param found`} />;
  }

  if (roomName === undefined) {
    return <PageError message={`No room with id ${roomId} found`} />;
  }

  return (
    <>
      <Box>
        <FocusedTaskList roomId={roomId} type="overdue" />
        <FocusedTaskList roomId={roomId} type="upcoming" />
        {tasksInRoom.map((task) => (
          <ListItem
            href={`${EDIT_TASK_ROUTE}?taskId=${task.id}`}
            key={task.id}
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
        <Link href={`${NEW_TASK_ROUTE}?roomId=${roomId}`}>
          <Add />
        </Link>
      </Fab>
    </>
  );
};
export default Tasks;
