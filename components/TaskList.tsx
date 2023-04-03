import { Container, Fab, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useSectionsQuery } from "../queries/useSectionsQuery";
import { TaskSection } from "./TaskSection";
import { Add } from "@mui/icons-material";
import { NewTask } from "./NewTask";
import { List } from "../types";

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
    <Container>
      <Typography variant="h2">{list.name}</Typography>
      {listSections?.map((section) => (
        <TaskSection key={section._id} section={section} />
      ))}
      <Fab onClick={handleNewTask}>
        <Add />
      </Fab>
      <NewTask onClose={handleClose} open={isEditModalOpen} />
    </Container>
  );
};
