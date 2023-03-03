import { useTaskLists } from "../queries/useListsQuery";
import { Task } from "../types";
import { LoadingPage } from "../components/LoadingPage";
import { useIdParams } from "../hooks/useIdParams";
import EditTaskForm from "../components/EditTask";
import { useState } from "react";
import { useRouter } from "next/router";
import { ErrorPage } from "../components/ErrorPage";
import { NavBar } from "../components/NavBar";
import { useOriginParam } from "../hooks/useOriginParam";
import { TASKS_ROUTE } from "../constants";

const EditTask = () => {
  const router = useRouter();
  const { taskId } = useIdParams();
  const pageOrigin = useOriginParam();

  const [task, setTask] = useState<Task | undefined>();

  const backUrl =
    pageOrigin === "home" ? "/" : `${TASKS_ROUTE}?roomId=${task?.roomId}`;

  const { isLoading } = useTaskLists({
    onSuccess: (data) => {
      const { tasks } = data;
      const matchingTask = tasks.find((t) => t.id === taskId);
      matchingTask && setTask(matchingTask);
    },
  });

  if (!router.isReady || isLoading) {
    return <LoadingPage />;
  }

  if (taskId === undefined) {
    return <ErrorPage message="taskId missing in URL" />;
  }

  if (!task) {
    return <ErrorPage message={`No task found with ID ${taskId}`} />;
  }

  return (
    <>
      <NavBar backUrl={backUrl} title="Edit Task" />
      <EditTaskForm initialTask={task} />
    </>
  );
};
export default EditTask;
