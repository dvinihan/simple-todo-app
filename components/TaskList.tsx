import {
  Container,
  Dialog,
  DialogTitle,
  Fab,
  List,
  ListItem,
  Paper,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useSectionsQuery } from "../queries/useSectionsQuery";
import { TaskSection } from "./TaskSection";
import { Add } from "@mui/icons-material";
import { NewTask } from "./NewTask";

type Props = {
  list: List;
};

export const TaskList = ({ list }: Props) => {
  const { data: allSections } = useSectionsQuery();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const listSections = useMemo(
    () => allSections?.filter((section) => section.listId === list._id),
    [allSections, list._id]
  );

  const handleNewTask = () => {
    setIsEditModalOpen(true);
  };

  const handleClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <h1>{list.name}</h1>
      {listSections?.map((section) => (
        <TaskSection key={section._id} section={section} />
      ))}
      <Fab onClick={handleNewTask}>
        <Add />
      </Fab>
      <Dialog onClose={handleClose} open={isEditModalOpen}>
        <DialogTitle>New Task</DialogTitle>
        <Container>
          <Paper>
            <NewTask />
          </Paper>
        </Container>
      </Dialog>
    </div>
  );
};
