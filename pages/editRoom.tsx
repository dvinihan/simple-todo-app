import { useState } from "react";
import { useRoomsQuery } from "../hooks/useRooms";
import { Room } from "../types";
import { useRouter } from "next/router";
import { useIdParams } from "../hooks/url";
import { LoadingPage } from "../components/LoadingPage";
import { EditRoomForm } from "../components/EditRoomForm";
import { ErrorPage } from "../components/ErrorPage";
import { NavBar } from "../components/NavBar";
import { HOME_ROUTE } from "../constants";

const EditRoom = () => {
  const router = useRouter();
  const { roomId } = useIdParams();

  const [room, setRoom] = useState<Room | undefined>();

  const { isLoading } = useRoomsQuery({
    onSuccess: (data) => {
      const { rooms } = data;
      const matchingRoom = rooms.find((r) => r.id === roomId);
      matchingRoom && setRoom(matchingRoom);
    },
  });

  if (!router.isReady || isLoading) {
    return <LoadingPage />;
  }

  if (roomId === undefined) {
    return <ErrorPage message="taskId missing in URL" />;
  }

  if (!room) {
    return <ErrorPage message={`No room found with ID ${roomId}`} />;
  }

  return (
    <>
      <NavBar backUrl={HOME_ROUTE} title="Edit Room" />
      <EditRoomForm initialRoom={room} />;
    </>
  );
};
export default EditRoom;
