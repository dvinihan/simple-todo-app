import {
  EDIT_ROOM_ROUTE,
  EDIT_TASK_ROUTE,
  HOME_ROUTE,
  NEW_TASK_ROUTE,
} from "../constants";
import { useTasksQuery } from "../queries/useTasks";
import { Box, Fab } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useRoomsQuery } from "../queries/useRooms";
import { FocusedTaskList } from "../components/FocusedTaskList";
import Link from "next/link";
import { ListItem } from "../components/ListItem";
import { useIdParams } from "../hooks/useIdParams";
import { PageError } from "../components/PageError";
import { LoadingPage } from "../components/LoadingPage";
import { useRouter } from "next/router";
import { NavBar } from "../components/NavBar";

const Tasks = () => {
  const router = useRouter();
  const { roomId } = useIdParams();

  const { tasks, isLoading: isTasksQueryLoading } = useTasksQuery();
  const { rooms, isLoading: isRoomsQueryLoading } = useRoomsQuery();

  const tasksInRoom = tasks.filter((task) => task.roomId === roomId);
  const roomName = rooms.find((room) => room.id === roomId)?.name;

  if (!router.isReady || isTasksQueryLoading || isRoomsQueryLoading) {
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
      <NavBar backUrl={HOME_ROUTE} title={roomName} />
      <Box>
        <FocusedTaskList roomId={roomId} type="overdue" />
        <FocusedTaskList roomId={roomId} type="upcoming" />
        {tasksInRoom.map((task) => (
          <ListItem
            dataTestId="task-link"
            href={`${EDIT_TASK_ROUTE}?taskId=${task.id}`}
            key={task.id}
            text={task.name}
          />
        ))}
      </Box>
      <Link href={`${EDIT_ROOM_ROUTE}?roomId=${roomId}`}>
        <Fab sx={{ position: "fixed", right: "16px", bottom: "86px" }}>
          <Edit />
        </Fab>
      </Link>
      <Link href={`${NEW_TASK_ROUTE}?roomId=${roomId}`}>
        <Fab sx={{ position: "fixed", right: "16px", bottom: "16px" }}>
          <Add />
        </Fab>
      </Link>
    </>
  );
};
export default Tasks;
