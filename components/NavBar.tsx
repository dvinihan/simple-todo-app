import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  EDIT_ROOM_ROUTE,
  EDIT_TASK_ROUTE,
  HOME_ROUTE,
  NEW_ROOM_ROUTE,
  NEW_TASK_ROUTE,
  TASKS_ROUTE,
} from "../constants";
import { useIdParams } from "../hooks/useIdParams";
import { useRoomsQuery } from "../hooks/useRooms";

export const NavBar = () => {
  const router = useRouter();
  const { roomId } = useIdParams();

  const { rooms } = useRoomsQuery();
  const roomName = rooms.find((room) => room.id === roomId)?.name;

  const pageTitle = useMemo(() => {
    switch (router.route) {
      case HOME_ROUTE:
        return "Rooms";
      case TASKS_ROUTE:
        return roomName;
      case EDIT_ROOM_ROUTE:
        return "Edit Room";
      case EDIT_TASK_ROUTE:
        return "Edit Task";
      case NEW_ROOM_ROUTE:
        return "New Room";
      case NEW_TASK_ROUTE:
        return "New Task";
    }
  }, [roomName, router.route]);

  return (
    <>
      <AppBar>
        <Toolbar>
          {router.pathname !== HOME_ROUTE && (
            <ArrowBack
              fontSize="large"
              onClick={() => router.back()}
              sx={{ marginRight: "10px" }}
            />
          )}
          <Typography fontSize={"30px"}>{pageTitle}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginBottom: "66px" }}></Box>
    </>
  );
};
