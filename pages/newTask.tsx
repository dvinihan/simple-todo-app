import { Task } from "../types";
import { LoadingPage } from "../components/LoadingPage";
import { useIdParams } from "../hooks/useIdParams";
import EditTaskForm from "../components/EditTaskForm";
import { useRouter } from "next/router";
import { ErrorPage } from "../components/ErrorPage";
import { useTasksQuery } from "../hooks/useTasks";

const NewTask = () => {
  const router = useRouter();
  const { roomId } = useIdParams();
  const { nextId } = useTasksQuery();

  if (!router.isReady) {
    return <LoadingPage />;
  }

  if (roomId === undefined) {
    return <ErrorPage message="roomId missing in URL" />;
  }

  return <EditTaskForm initialTask={new Task({ roomId, id: nextId })} />;
};
export default NewTask;
