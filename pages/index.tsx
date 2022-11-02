import { Add } from "@mui/icons-material";
import { Card, Container, Fab, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { EDIT_ROOM_ROUTE, TASKS_ROUTE } from "../constants";
import { useRoomsQuery } from "../hooks/useRooms";
import { OverdueTasks } from "../OverdueTasks";
import { UpcomingTasks } from "../UpcomingTasks";

export const Home = () => {
  const { rooms } = useRoomsQuery();
  const router = useRouter();

  return (
    <>
      <Container>
        <OverdueTasks />
        <UpcomingTasks />
        {rooms.map((room) => (
          <Card
            key={room.id}
            onClick={() => {
              router.push(
                `${TASKS_ROUTE}?roomId=${room.id}&title=${room.name}`
              );
            }}
            sx={{
              marginTop: "10px",
              marginHorizontal: "10px",
            }}
            variant="outlined"
          >
            <Typography title={room.name} />
          </Card>
        ))}
      </Container>
      <Fab
        onClick={() => {
          router.push(`${EDIT_ROOM_ROUTE}?title=New Room`);
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
