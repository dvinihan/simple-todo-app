import { Room } from "../types";
import { useRouter } from "next/router";
import { LoadingPage } from "../components/LoadingPage";
import { EditRoomForm } from "../components/EditRoomForm";
import { useRoomsQuery } from "../hooks/useRooms";

const NewRoom = () => {
  const router = useRouter();
  const { nextId } = useRoomsQuery();

  if (!router.isReady) {
    return <LoadingPage />;
  }

  return <EditRoomForm initialRoom={new Room({ id: nextId })} />;
};
export default NewRoom;
