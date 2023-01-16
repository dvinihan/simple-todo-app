import { useTasksQuery } from "../hooks/useTasks";
import { Task } from "../types";
import { LoadingPage } from "../components/LoadingPage";
import { useIdParams } from "../hooks/useIdParams";
import EditTaskForm from "../components/EditTaskForm";
import { useState } from "react";
import { useRouter } from "next/router";
import { ErrorPage } from "../components/ErrorPage";
import { NavBar } from "../components/NavBar";
import { useOriginParam } from "../hooks/useOriginParam";

const EditTask = () => {
  const router = useRouter();
  const { taskId } = useIdParams();
  const pageOrigin = useOriginParam();

  const [task, setTask] = useState<Task | undefined>();

  const { isLoading } = useTasksQuery({
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
      <NavBar backUrl={pageOrigin} title="Edit Task" />
      <EditTaskForm initialTask={task} pageOrigin={pageOrigin} />
    </>
  );
};
export default EditTask;
