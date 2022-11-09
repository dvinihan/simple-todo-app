import { Task } from "../types";
import { LoadingPage } from "../components/LoadingPage";
import { useIdParams } from "../hooks/useIdParams";
import EditTaskForm from "../components/EditTaskForm";
import { useRouter } from "next/router";
import { ErrorPage } from "../components/ErrorPage";

const NewTask = () => {
  const router = useRouter();
  const { roomId, nextId } = useIdParams();

  if (!router.isReady) {
    return <LoadingPage />;
  }

  if (roomId === undefined) {
    return <ErrorPage message="roomId missing in URL" />;
  }

  if (nextId === undefined) {
    return <ErrorPage message="nextId missing in URL" />;
  }

  return <EditTaskForm initialTask={new Task({ roomId, id: nextId })} />;
};
export default NewTask;
