import { EDIT_ROOM_ROUTE, EDIT_TASK_ROUTE } from "../constants";
import { useTasksQuery } from "../hooks/useTasks";
import { Box, Fab } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useRoomsQuery } from "../hooks/useRooms";
import { FocusedTaskList } from "../components/FocusedTaskList";
import Link from "next/link";
import { ListItem } from "../components/ListItem";
import { useIdParams } from "../hooks/useIdParams";
import { PageError } from "../components/PageError";
import { Loading } from "../components/Loading";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AppContext } from "./_app";

const Tasks = () => {
  const router = useRouter();
  const idParams = useIdParams();
  const { roomId } = idParams ?? {};
  const { setBackButtonHref, setPageTitle } = useContext(AppContext) ?? {};

  const { tasks } = useTasksQuery();
  const { rooms } = useRoomsQuery();

  const tasksInRoom = tasks.filter((task) => task.roomId === roomId);
  const roomName = rooms.find((room) => room.id === roomId)?.name;

  useEffect(() => {
    setPageTitle?.(roomName ?? "");
  }, [roomName, setPageTitle]);

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
      <Box>
        <FocusedTaskList roomId={roomId} type="overdue" />
        <FocusedTaskList roomId={roomId} type="upcoming" />
        {tasksInRoom.map((task) => (
          <ListItem
            href={`${EDIT_TASK_ROUTE}?taskId=${task.id}`}
            key={task.id}
            onClick={() => setBackButtonHref?.(router.asPath)}
            text={task.name}
          />
        ))}
      </Box>
      <Fab sx={{ position: "fixed", right: "16px", bottom: "86px" }}>
        <Link href={`${EDIT_ROOM_ROUTE}?roomId=${roomId}`}>
          <Edit onClick={() => setBackButtonHref?.(router.asPath)} />
        </Link>
      </Fab>
      <Fab sx={{ position: "fixed", right: "16px", bottom: "16px" }}>
        <Link href={`${EDIT_TASK_ROUTE}?roomId=${roomId}`}>
          <Add onClick={() => setBackButtonHref?.(router.asPath)} />
        </Link>
      </Fab>
    </>
  );
};
export default Tasks;
