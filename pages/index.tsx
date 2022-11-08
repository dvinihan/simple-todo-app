import { Add } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { EDIT_ROOM_ROUTE, TASKS_ROUTE } from "../constants";
import { useRoomsQuery } from "../hooks/useRooms";
import { FocusedTaskList } from "../components/FocusedTaskList";
import { ListItem } from "../components/ListItem";
import Link from "next/link";
import { Loading } from "../components/Loading";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AppContext } from "./_app";

const Home = () => {
  const router = useRouter();
  const { rooms, isLoading } = useRoomsQuery();
  const { setBackButtonHref, setPageTitle } = useContext(AppContext) ?? {};

  useEffect(() => {
    setPageTitle?.("Rooms");
  }, [setPageTitle]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box>
        <FocusedTaskList type="overdue" />
        <FocusedTaskList type="upcoming" />
        {rooms.map((room) => (
          <ListItem
            href={`${TASKS_ROUTE}?roomId=${room.id}`}
            key={room.id}
            onClick={() => setBackButtonHref?.(router.asPath)}
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
          <Add onClick={() => setBackButtonHref?.(router.asPath)} />
        </Link>
      </Fab>
    </>
  );
};

export default Home;
