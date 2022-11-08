import { useContext, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { Frequency, HOME_ROUTE, TASKS_QUERY_KEY } from "../constants";
import { useRoomsQuery } from "../hooks/useRooms";
import { useSaveTask } from "../hooks/useSaveTask";
import { useTasksQuery } from "../hooks/useTasks";
import { Task } from "../types";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import { NavBar } from "../components/NavBar";
import { Loading } from "../components/Loading";
import { useIdParams } from "../hooks/useIdParams";
import { ActionButton } from "../components/ActionButton";
import { ActionModal } from "../components/ActionModal";
import { PickerModal } from "../components/PickerModal";

import "react-datepicker/dist/react-datepicker.css";
import { AppContext } from "./_app";

const EditTask = () => {
  const { taskId, roomId } = useIdParams();

  const { nextId, isLoading } = useTasksQuery({
    onSuccess: (data) => {
      const { tasks, nextId } = data;
      const matchingTask = tasks.find((t) => t.id === taskId);
      setTask(matchingTask ?? new Task({ roomId, id: nextId }));
    },
  });

  const [task, setTask] = useState(new Task());

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
  const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);
  const [shouldShowDiscardModal, setShouldShowDiscardModal] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
  }>({});

  const { setPageTitle } = useContext(AppContext) ?? {};
  useEffect(() => {
    const title = task.id === nextId ? "New Task" : "Edit Task";
    setPageTitle?.(title);
  }, [nextId, setPageTitle, task.id]);

  useEffect(() => {
    router.beforePopState(() => {
      if (hasChanges) {
        setShouldShowDiscardModal(true);
        return false;
      }
      return true;
    });
  }, [hasChanges, router]);

  const onSelectRoom = (roomName: string) => {
    const room = rooms.find((r) => r.name === roomName);
    if (room) {
      setTask((t) => ({ ...t, roomId: room.id }));
      setHasChanges(true);
    }
    setIsRoomDialogVisible(false);
  };

  const onSelectFrequency = (frequency: Frequency) => {
    setTask((t) => ({ ...t, frequencyType: frequency }));
    setIsFreqDialogVisible(false);
  };

  const onChangeDate = (date: Date) => {
    setTask((t) => ({ ...t, lastDone: date.getMilliseconds() }));
    setHasChanges(true);
  };

  const save = (taskToSave: Task) => {
    if (!taskToSave.name) {
      setErrors((e) => ({ ...e, name: "You must enter a task name" }));
    } else {
      saveTask(taskToSave);
      setHasChanges(false);
    }
  };

  const roomName = useMemo(
    () => rooms.find((room) => room.id === task.roomId)?.name ?? "",
    [rooms, task.roomId]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
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
          <Alert severity="error" sx={{ fontSize: 18 }}>
            {errors.name}
          </Alert>
        )}
        <Card
          onClick={() => setIsRoomDialogVisible(true)}
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
              setIsFreqDialogVisible(true);
              setHasChanges(true);
            }}
            variant="outlined"
          >
            {task.frequencyType}
          </Button>
        </Box>

        <Typography fontSize="18px">Last completed:</Typography>
        <DatePicker
          className="date-picker"
          onChange={onChangeDate}
          selected={new Date(task.lastDone)}
        />

        <ActionButton
          color="success"
          onClick={() => save({ ...task, lastDone: new Date() })}
          text="Just did it!"
        />
        <ActionButton onClick={() => save(task)} text="Save" />
      </Container>

      <PickerModal
        onClose={() => setIsFreqDialogVisible(false)}
        onSelect={(value) => onSelectFrequency(value as Frequency)}
        open={isFreqDialogVisible}
        options={[
          Frequency.DAYS,
          Frequency.WEEKS,
          Frequency.MONTHS,
          Frequency.YEARS,
        ]}
      />

      <PickerModal
        onClose={() => setIsRoomDialogVisible(false)}
        onSelect={onSelectRoom}
        open={isRoomDialogVisible}
        options={rooms.map((r) => r.name)}
      />

      <Fab
        onClick={() => setShouldShowDeleteModal(true)}
        sx={{ position: "fixed", right: "16px", bottom: "16px" }}
      >
        <Delete />
      </Fab>

      <ActionModal
        onConfirm={() => doDelete(task.id)}
        onDeny={() => setShouldShowDeleteModal(false)}
        open={shouldShowDeleteModal}
        title="Are you sure you want to delete this task?"
      />

      <ActionModal
        onConfirm={() => save(task)}
        onDeny={() => setShouldShowDiscardModal(false)}
        open={shouldShowDiscardModal}
        title="Save changes?"
      />
    </>
  );
};
export default EditTask;
