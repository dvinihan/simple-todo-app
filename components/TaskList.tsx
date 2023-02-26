import { useMemo } from "react";
import { useSectionsQuery } from "../queries/useSectionsQuery";
import { List } from "../types";
import { TaskSection } from "./TaskSection";

type Props = {
  list: List;
};

export const TaskList = ({ list }: Props) => {
  const { data: allSections } = useSectionsQuery();

  const listSections = useMemo(
    () => allSections?.filter((section) => section.listId === list._id),
    [allSections, list._id]
  );

  return (
    <div>
      <h1>{list.name}</h1>
      {listSections?.map((section) => (
        <TaskSection key={section._id} section={section} />
      ))}
    </div>
  );
};
