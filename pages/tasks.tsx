import { EDIT_ROOM_ROUTE, EDIT_TASK_ROUTE } from "../constants";
import { useTasksQuery } from "../hooks/useTasks";
import { getNumberUrlParam } from "../helpers/url";
import { Box, Fab } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { NavBar } from "../components/NavBar";
import { useRoomsQuery } from "../hooks/useRooms";
import { FocusedTaskList } from "../components/FocusedTaskList";
import Link from "next/link";
import { ListItem } from "../components/ListItem";
import { useRouter } from "next/router";

const Tasks = () => {
  const router = useRouter();
  const urlRoomId = getNumberUrlParam(router.query, "roomId");

  const { tasks } = useTasksQuery();
  const { rooms } = useRoomsQuery();

  const tasksInRoom = tasks.filter((task) => task.roomId === urlRoomId);
  const roomName = rooms.find((room) => room.id === urlRoomId)?.name;

  return (
    <>
      <NavBar title={roomName ?? ""} />
      <Box>
        <FocusedTaskList type="overdue" roomId={urlRoomId} />
        <FocusedTaskList type="upcoming" roomId={urlRoomId} />
        {tasksInRoom.map((task) => (
          <ListItem
            key={task.id}
            href={`${EDIT_TASK_ROUTE}?taskId=${task.id}`}
            text={task.name}
          />
        ))}
      </Box>
      <Fab sx={{ position: "fixed", right: "16px", bottom: "86px" }}>
        <Link href={`${EDIT_ROOM_ROUTE}?roomId=${urlRoomId}`}>
          <Edit />
        </Link>
      </Fab>
      <Fab sx={{ position: "fixed", right: "16px", bottom: "16px" }}>
        <Link href={`${EDIT_TASK_ROUTE}?roomId=${urlRoomId}`}>
          <Add />
        </Link>
      </Fab>
    </>
  );
};

export default Tasks;
