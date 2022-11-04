import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ROOMS_QUERY_KEY, HOME_ROUTE, TASKS_ROUTE } from "../constants";
import { DiscardModalContext } from "../context/DiscardModalContext";
import { useDeleteRoom } from "../hooks/useDeleteRoom";
import { useRoomsQuery } from "../hooks/useRooms";
import { useSaveRoom } from "../hooks/useSaveRoom";
import { Room } from "../types";
import { useRouter } from "next/router";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { getNumberUrlParam } from "../helpers/url";
import { NavBar } from "../components/NavBar";

type RoomInputErrors = {
  name?: string;
};

const EditRoom = () => {
  const router = useRouter();
  const urlRoomId = getNumberUrlParam(router.asPath, "roomId");

  const queryClient = useQueryClient();
  const { rooms, nextId } = useRoomsQuery();
  const roomId = urlRoomId ?? nextId;
  const { mutate: saveRoom, isLoading } = useSaveRoom({
    onSettled: () => {
      queryClient.invalidateQueries(ROOMS_QUERY_KEY);
      router.push(`${TASKS_ROUTE}?roomId=${roomId}`);
    },
  });
  const { mutate: doDelete } = useDeleteRoom({
    onSettled: () => {
      queryClient.invalidateQueries(ROOMS_QUERY_KEY);
      router.push(HOME_ROUTE);
    },
  });

  const [room, setRoom] = useState(new Room());
  const [errors, setErrors] = useState<RoomInputErrors>({});
  const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);

  const { discardModalState, setDiscardModalState } =
    useContext(DiscardModalContext) ?? {};

  const setHasChanges = (hasChanges: boolean) => {
    setDiscardModalState?.({ show: false, action: () => {}, hasChanges });
  };

  useEffect(() => {
    const initialRoom = rooms.find((room) => room.id === urlRoomId);
    initialRoom && setRoom(initialRoom);
  }, [rooms, urlRoomId]);

  const save = async () => {
    if (!room.name) {
      setErrors((e) => ({ ...e, name: "You must enter a room name" }));
    } else {
      saveRoom({ ...room, id: roomId });
      setHasChanges(false);
    }
  };

  const deleteRoom = () => {
    doDelete(room.id);
  };

  return (
    <>
      <NavBar title="Edit Room" />
      <TextField
        label="Name"
        value={room?.name}
        onChange={(e) => {
          setRoom({ ...room, name: e.target.value });
          setHasChanges(true);
        }}
        sx={{ marginBottom: "10px" }}
      />
      {errors.name && (
        <Typography sx={{ color: "red", fontSize: 18 }}>
          {errors.name}
        </Typography>
      )}
      <Button sx={{ marginTop: "10px" }} onClick={save} variant="contained">
        Save
      </Button>
      <Modal open={isLoading}>
        <CircularProgress />
      </Modal>

      <Fab
        onClick={() => {
          setShouldShowDeleteModal(true);
        }}
        sx={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
      >
        <Delete />
      </Fab>
      <Dialog
        onClose={() => setShouldShowDeleteModal(false)}
        open={shouldShowDeleteModal}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this room?
          </DialogContentText>
          <DialogActions>
            <Button onClick={deleteRoom}>Yes</Button>
            <Button onClick={() => setShouldShowDeleteModal(false)}>No</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={() =>
          setDiscardModalState?.({
            show: false,
            action: () => {},
            hasChanges: true,
          })
        }
        open={Boolean(discardModalState?.show)}
      >
        <DialogContent>
          <DialogTitle>Save changes?</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                setDiscardModalState?.({
                  show: false,
                  action: () => {},
                  hasChanges: false,
                });
                discardModalState?.action();
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                save();
                setDiscardModalState?.({
                  show: false,
                  action: () => {},
                  hasChanges: false,
                });
                discardModalState?.action();
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditRoom;
