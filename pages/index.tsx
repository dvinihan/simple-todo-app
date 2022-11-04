import { Add } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { EDIT_ROOM_ROUTE, TASKS_ROUTE } from "../constants";
import { useRoomsQuery } from "../hooks/useRooms";
import { NavBar } from "../components/NavBar";
import { FocusedTaskList } from "../components/FocusedTaskList";
import { ListItem } from "../components/ListItem";
import Link from "next/link";

const Home = () => {
  const { rooms } = useRoomsQuery();

  return (
    <>
      <NavBar title="Rooms" />
      <Box>
        <FocusedTaskList type="overdue" />
        <FocusedTaskList type="upcoming" />
        {rooms.map((room) => (
          <ListItem
            key={room.id}
            href={`${TASKS_ROUTE}?roomId=${room.id}`}
            text={room.name}
          />
        ))}
      </Box>
      <Fab
        sx={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
        }}
      >
        <Link href={`${EDIT_ROOM_ROUTE}`}>
          <Add />
        </Link>
      </Fab>
    </>
  );
};

export default Home;
