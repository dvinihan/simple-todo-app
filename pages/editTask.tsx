import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { Frequency, HOME_ROUTE, TASKS_QUERY_KEY } from "../constants";
import { useRoomsQuery } from "../hooks/useRooms";
import { useSaveTask } from "../hooks/useSaveTask";
import { useTasksQuery } from "../hooks/useTasks";
import { NULL_TASK_ID, Room, Task } from "../types";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { DiscardModalContext } from "../context/DiscardModalContext";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import { NavBar } from "../components/NavBar";
import { Loading } from "../components/Loading";
import { useIdParams } from "../hooks/useIdParams";
import { ActionButton } from "../components/ActionButton";

type TaskInputErrors = {
  name?: string;
};

type Props = {
  initialTask: Task;
};

const EditTask = ({ initialTask }: Props) => {
  const [task, setTask] = useState(initialTask);
  const title = task.id === NULL_TASK_ID ? "New Task" : "Edit Task";

  const router = useRouter();
  const queryClient = useQueryClient();
  const { rooms } = useRoomsQuery();
  const { mutate: saveTask } = useSaveTask({
    onSuccess: () => {
      queryClient.invalidateQueries(TASKS_QUERY_KEY);
      router.push(HOME_ROUTE);
    },
  });
  const { mutate: doDelete } = useDeleteTask({
    onSuccess: () => {
      queryClient.invalidateQueries(TASKS_QUERY_KEY);
      router.push(HOME_ROUTE);
    },
  });

  const [isRoomDialogVisible, setIsRoomDialogVisible] = useState(false);
  const [isFreqDialogVisible, setIsFreqDialogVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const { discardModalState, setDiscardModalState } =
    useContext(DiscardModalContext) ?? {};

  const [errors, setErrors] = useState<TaskInputErrors>({});

  const showAlert = useCallback(
    (e: Event) => {
      console.log("vinihan - hasChanges");
      if (hasChanges) {
        e.preventDefault();

        setDiscardModalState?.({
          show: true,
          action: () => {},
          hasChanges: true,
        });
      }
    },
    [hasChanges, setDiscardModalState]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", showAlert);

    return () => {
      window.removeEventListener("beforeunload", showAlert);
    };
  }, [showAlert]);

  const showRoomDialog = () => setIsRoomDialogVisible(true);
  const hideRoomDialog = () => setIsRoomDialogVisible(false);
  const showFreqDialog = () => setIsFreqDialogVisible(true);
  const hideFreqDialog = () => setIsFreqDialogVisible(false);
  const showDatePicker = () => setIsDatePickerVisible(true);
  const hideDatePicker = () => setIsDatePickerVisible(false);

  const onSelectRoom = (room: Room) => {
    setTask((t) => ({ ...t, roomId: room.id }));
    hideRoomDialog();
    setHasChanges(true);
  };

  const onSelectFrequency = (frequency: Frequency) => {
    setTask((t) => ({ ...t, frequencyType: frequency }));
    hideFreqDialog();
  };

  const onChangeDate = (date: Date) => {
    setTask((t) => ({ ...t, lastDone: date.getMilliseconds() }));
    hideDatePicker();
    setHasChanges(true);
  };

  const completeTask = () => {
    save({ ...task, lastDone: new Date() });
  };

  const save = (taskToSave: Task) => {
    if (!taskToSave.name) {
      setErrors((e) => ({ ...e, name: "You must enter a task name" }));
    } else {
      saveTask(taskToSave);
      setHasChanges(false);
    }
  };

  const deleteTask = () => {
    doDelete(task.id);
  };

  const roomName = useMemo(
    () => rooms.find((room) => room.id === task.roomId)?.name ?? "",
    [rooms, task.roomId]
  );

  return (
    <>
      <NavBar title={title} />
      <Container>
        <TextField
          fullWidth
          label="Name"
          onChange={(e) => {
            setTask({ ...task, name: e.target.value });
            setHasChanges(true);
          }}
          sx={{ backgroundColor: "white", marginY: "10px" }}
          value={task.name}
        />
        {errors.name && (
          <Alert sx={{ color: "red", fontSize: 18 }}>{errors.name}</Alert>
        )}
        <Card
          onClick={showRoomDialog}
          sx={{ alignItems: "center", paddingY: "10px", marginY: "10px" }}
        >
          <Container>
            <Typography fontSize={"18px"}>Room: {roomName}</Typography>
          </Container>
        </Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginY: "10px",
            paddingY: "10px",
          }}
        >
          <Typography>Every</Typography>
          <TextField
            onChange={(e) => {
              const newAmount = e.target.value ? parseInt(e.target.value) : 0;
              setTask((t) => ({ ...t, frequencyAmount: newAmount }));
              setHasChanges(true);
            }}
            sx={{ backgroundColor: "white", marginX: "10px" }}
            type="numeric"
            value={task.frequencyAmount?.toString()}
          />
          <Button
            onClick={() => {
              showFreqDialog();
              setHasChanges(true);
            }}
            variant="outlined"
          >
            {task.frequencyType}
          </Button>
        </Box>
        <Card onClick={showDatePicker} sx={{ marginY: "10px" }}>
          <Container sx={{ alignItems: "center", paddingY: "10px" }}>
            <Typography fontSize={"18px"}>
              Last completed: {new Date(task.lastDone).toDateString()}
            </Typography>
          </Container>
        </Card>
        <ActionButton
          color="success"
          onClick={completeTask}
          text="Just did it!"
        />
        <ActionButton onClick={() => saveTask(task)} text="Save" />
      </Container>

      <Dialog onClose={hideFreqDialog} open={isFreqDialogVisible}>
        <MenuItem
          defaultChecked={task.frequencyType === Frequency.DAYS}
          key="days-radio-button"
          onClick={() => onSelectFrequency(Frequency.DAYS)}
          value={Frequency.DAYS}
        >
          {Frequency.DAYS}
        </MenuItem>
        <MenuItem
          defaultChecked={task.frequencyType === Frequency.WEEKS}
          key="weeks-radio-button"
          onClick={() => onSelectFrequency(Frequency.WEEKS)}
          value={Frequency.WEEKS}
        >
          {Frequency.WEEKS}
        </MenuItem>
        <MenuItem
          defaultChecked={task.frequencyType === Frequency.MONTHS}
          key="months-radio-button"
          onClick={() => onSelectFrequency(Frequency.MONTHS)}
          value={Frequency.MONTHS}
        >
          {Frequency.MONTHS}
        </MenuItem>
        <MenuItem
          defaultChecked={task.frequencyType === Frequency.YEARS}
          key="years-radio-button"
          onClick={() => onSelectFrequency(Frequency.YEARS)}
          value={Frequency.YEARS}
        >
          {Frequency.YEARS}
        </MenuItem>
      </Dialog>

      <Dialog onClose={hideRoomDialog} open={isRoomDialogVisible}>
        <DialogContent>
          {rooms.map((room) => {
            return (
              <MenuItem
                defaultChecked={task.roomId === room.id}
                key={room.id}
                onClick={() => onSelectRoom(room)}
                value={room.name}
              >
                {room.name}
              </MenuItem>
            );
          })}
        </DialogContent>
      </Dialog>

      {isDatePickerVisible && (
        <DatePicker
          onChange={onChangeDate}
          selected={new Date(task.lastDone)}
        />
      )}

      <Fab
        onClick={() => {
          setShouldShowDeleteModal(true);
        }}
        sx={{ position: "fixed", right: "16px", bottom: "16px" }}
      >
        <Delete />
      </Fab>
      <Dialog
        onClose={() => setShouldShowDeleteModal(false)}
        open={shouldShowDeleteModal}
      >
        <DialogContent>
          <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
          <DialogActions>
            <Button onClick={deleteTask}>Yes</Button>
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
            <Button>No</Button>
            <Button
              onClick={() => {
                save(task);
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

const EditTaskContainer = () => {
  const idParams = useIdParams();
  const { taskId, roomId } = idParams ?? {};

  const [initialTask, setInitialTask] = useState<Task | undefined>();

  useTasksQuery({
    onSuccess: (data) => {
      const { tasks, nextId } = data;
      const matchingTask = tasks.find((t) => t.id === taskId);
      setInitialTask(matchingTask ?? new Task({ roomId, id: nextId }));
    },
  });

  if (!idParams) {
    // don't show anything until the url can be evaluated
    return <Loading />;
  }

  return initialTask ? <EditTask initialTask={initialTask} /> : null;
};

export default EditTaskContainer;
