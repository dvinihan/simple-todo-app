import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ROOMS_QUERY_KEY, HOME_ROUTE, TASKS_ROUTE } from "../constants";
import { useDeleteRoom } from "../hooks/useDeleteRoom";
import { useRoomsQuery } from "../hooks/useRooms";
import { useSaveRoom } from "../hooks/useSaveRoom";
import { Room } from "../types";
import { useRouter } from "next/router";
import {
  Alert,
  CircularProgress,
  Container,
  Fab,
  Modal,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useIdParams } from "../hooks/useIdParams";
import { Loading } from "../components/Loading";
import { ActionButton } from "../components/ActionButton";
import { ActionModal } from "../components/ActionModal";
import { AppContext } from "./_app";

const EditRoom = () => {
  const { roomId } = useIdParams();

  const { nextId, isLoading: isLoadingRooms } = useRoomsQuery({
    onSuccess: (data) => {
      const { rooms, nextId } = data;
      const matchingRoom = rooms.find((r) => r.id === roomId);
      setRoom(matchingRoom ?? new Room({ id: nextId }));
    },
  });

  const [room, setRoom] = useState(new Room());

  const router = useRouter();
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState<{ name?: string }>({});

  const [hasChanges, setHasChanges] = useState(false);
  const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);
  const [shouldShowDiscardModal, setShouldShowDiscardModal] = useState(false);

  const { setPageTitle } = useContext(AppContext) ?? {};
  useEffect(() => {
    const title = room.id === nextId ? "New Room" : "Edit Room";
    setPageTitle?.(title);
  }, [nextId, room.id, setPageTitle]);

  useEffect(() => {
    router.beforePopState(() => {
      if (hasChanges) {
        setShouldShowDiscardModal(true);
        return false;
      }
      return true;
    });
  }, [hasChanges, router]);

  const { mutate: saveRoom, isLoading: isLoadingSaveRoom } = useSaveRoom({
    onSettled: () => {
      queryClient.invalidateQueries(ROOMS_QUERY_KEY);
      router.push(`${TASKS_ROUTE}?roomId=${room.id}`);
    },
  });
  const { mutate: doDelete } = useDeleteRoom({
    onSettled: () => {
      queryClient.invalidateQueries(ROOMS_QUERY_KEY);
      router.push(HOME_ROUTE);
    },
  });

  const save = async () => {
    if (!room.name) {
      setErrors((e) => ({ ...e, name: "You must enter a room name" }));
    } else {
      saveRoom(room);
      setHasChanges(false);
    }
  };

  if (isLoadingRooms) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <TextField
          fullWidth
          label="Name"
          onChange={(e) => {
            setRoom({ ...room, name: e.target.value });
            setHasChanges(true);
          }}
          sx={{ backgroundColor: "white", marginY: "10px" }}
          value={room?.name}
        />
        {errors.name && (
          <Alert severity="error" sx={{ fontSize: "18px" }}>
            {errors.name}
          </Alert>
        )}
        <ActionButton onClick={save} text="Save" />
      </Container>

      <Modal open={isLoadingSaveRoom}>
        <CircularProgress />
      </Modal>

      <Fab
        onClick={() => setShouldShowDeleteModal(true)}
        sx={{ position: "fixed", right: "16px", bottom: "16px" }}
      >
        <Delete />
      </Fab>

      <ActionModal
        onConfirm={() => doDelete(room.id)}
        onDeny={() => setShouldShowDeleteModal(false)}
        open={shouldShowDeleteModal}
        title="Are you sure you want to delete this room?"
      />

      <ActionModal
        onConfirm={save}
        onDeny={() => setShouldShowDiscardModal(false)}
        open={shouldShowDiscardModal}
        title="Save changes?"
      />
    </>
  );
};
export default EditRoom;
