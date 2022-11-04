import { Add } from "@mui/icons-material";
import { Box, Card, Fab, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { EDIT_ROOM_ROUTE, TASKS_ROUTE } from "../constants";
import { useRoomsQuery } from "../hooks/useRooms";
import { NavBar } from "../components/NavBar";
import { FocusedTaskList } from "../components/FocusedTaskList";

const Home = () => {
  const { rooms } = useRoomsQuery();
  const router = useRouter();

  return (
    <>
      <NavBar title="Rooms" />
      <Box>
        <FocusedTaskList type="overdue" />
        <FocusedTaskList type="upcoming" />
        {rooms.map((room) => (
          <Card
            key={room.id}
            onClick={() => {
              router.push(`${TASKS_ROUTE}?roomId=${room.id}`);
            }}
            sx={{
              marginTop: "10px",
            }}
            variant="outlined"
          >
            <Typography title={room.name} />
          </Card>
        ))}
      </Box>
      <Fab
        onClick={() => {
          router.push(`${EDIT_ROOM_ROUTE}`);
        }}
        sx={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
      >
        <Add />
      </Fab>
    </>
  );
};

export default Home;
