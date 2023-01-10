import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ROOMS_QUERY_KEY, HOME_ROUTE, TASKS_ROUTE } from "../constants";
import { useDeleteRoom } from "../hooks/useDeleteRoom";
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
import { ActionButton } from "../components/ActionButton";
import { ActionModal } from "../components/ActionModal";

type Props = {
  initialRoom: Room;
};

export const EditRoomForm = ({ initialRoom }: Props) => {
  const [room, setRoom] = useState(initialRoom);

  const router = useRouter();
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState<{ name?: string }>({});

  const [hasChanges, setHasChanges] = useState(false);
  const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);
  const [discardModalState, setDiscardModalState] = useState<{
    open: boolean;
    redirectUrl?: string;
  }>({ open: false, redirectUrl: undefined });

  const redirectToTaskList = () => {
    router.push(`${TASKS_ROUTE}?roomId=${room.id}`);
  };

  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (hasChanges) {
        setDiscardModalState({ open: true, redirectUrl: url });
        return false;
      }
      return true;
    });
  }, [hasChanges, router]);

  const { mutate: saveRoom, isLoading: isLoadingSaveRoom } = useSaveRoom({
    onSettled: () => {
      queryClient.invalidateQueries(ROOMS_QUERY_KEY);
      redirectToTaskList();
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
        onClose={() => setShouldShowDeleteModal(false)}
        onConfirm={() => doDelete(room.id)}
        onDeny={() => setShouldShowDeleteModal(false)}
        open={shouldShowDeleteModal}
        title="Are you sure you want to delete this room?"
      />

      <ActionModal
        onClose={() => setDiscardModalState({ open: false })}
        onConfirm={save}
        onDeny={() => redirectToTaskList()}
        open={discardModalState.open}
        title="Save changes?"
      />
    </>
  );
};
