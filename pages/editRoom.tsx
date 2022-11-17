import { useState } from "react";
import { useRoomsQuery } from "../hooks/useRooms";
import { Room } from "../types";
import { useRouter } from "next/router";
import { useIdParams } from "../hooks/useIdParams";
import { LoadingPage } from "../components/LoadingPage";
import { EditRoomForm } from "../components/EditRoomForm";
import { ErrorPage } from "../components/ErrorPage";

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

  return <EditRoomForm initialRoom={room} />;
};
export default EditRoom;
