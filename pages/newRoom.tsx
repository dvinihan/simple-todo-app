import { Room } from "../types";
import { useRouter } from "next/router";
import { LoadingPage } from "../components/LoadingPage";
import { EditRoomForm } from "../components/EditRoomForm";
import { useRoomsQuery } from "../hooks/useRooms";
import { NavBar } from "../components/NavBar";
import { HOME_ROUTE } from "../constants";

const NewRoom = () => {
  const router = useRouter();
  const { nextId } = useRoomsQuery();

  if (!router.isReady) {
    return <LoadingPage />;
  }

  return (
    <>
      <NavBar backUrl={HOME_ROUTE} title="New Room" />
      <EditRoomForm initialRoom={new Room({ id: nextId })} />
    </>
  );
};
export default NewRoom;
