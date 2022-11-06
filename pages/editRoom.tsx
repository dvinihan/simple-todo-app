import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { ROOMS_QUERY_KEY, HOME_ROUTE, TASKS_ROUTE } from "../constants";
import { DiscardModalContext } from "../context/DiscardModalContext";
import { useDeleteRoom } from "../hooks/useDeleteRoom";
import { useRoomsQuery } from "../hooks/useRooms";
import { useSaveRoom } from "../hooks/useSaveRoom";
import { NULL_ROOM_ID, Room } from "../types";
import { useRouter } from "next/router";
import {
  Button,
  CircularProgress,
  Container,
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
import { NavBar } from "../components/NavBar";
import { useIdParams } from "../hooks/useIdParams";
import { Loading } from "../components/Loading";
import { ActionButton } from "../components/ActionButton";

type Props = {
  initialRoom: Room;
};

const EditRoom = ({ initialRoom }: Props) => {
  const [room, setRoom] = useState(initialRoom);
  const title = room.id === NULL_ROOM_ID ? "New Room" : "Edit Room";

  const router = useRouter();
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState<{ name?: string }>({});
  const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);

  const { discardModalState, setDiscardModalState } =
    useContext(DiscardModalContext) ?? {};

  const { mutate: saveRoom, isLoading } = useSaveRoom({
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

  const setHasChanges = (hasChanges: boolean) => {
    setDiscardModalState?.({ show: false, action: () => {}, hasChanges });
  };

  const save = async () => {
    if (!room.name) {
      setErrors((e) => ({ ...e, name: "You must enter a room name" }));
    } else {
      saveRoom(room);
      setHasChanges(false);
    }
  };

  const deleteRoom = () => {
    doDelete(room.id);
  };

  return (
    <>
      <NavBar title={title} />
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
          <Typography color={"red"} fontSize={"18px"}>
            {errors.name}
          </Typography>
        )}
        <ActionButton onClick={save} text="Save" />
      </Container>

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

const EditRoomContainer = () => {
  const idParams = useIdParams();
  const { roomId } = idParams ?? {};

  const [initialRoom, setInitialRoom] = useState<Room | undefined>();

  useRoomsQuery({
    onSuccess: (data) => {
      const { rooms, nextId } = data;
      const matchingRoom = rooms.find((r) => r.id === roomId);
      setInitialRoom(matchingRoom ?? new Room({ id: nextId }));
    },
  });

  if (!idParams) {
    // don't show anything until the url can be evaluated
    return <Loading />;
  }

  return initialRoom ? <EditRoom initialRoom={initialRoom} /> : null;
};
export default EditRoomContainer;
