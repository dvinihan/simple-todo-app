import { Task } from "../types";
import { LoadingPage } from "../components/LoadingPage";
import { useIdParams, useOriginParam } from "../hooks/url";
import EditTaskForm from "../components/EditTaskForm";
import { useRouter } from "next/router";
import { ErrorPage } from "../components/ErrorPage";
import { useTasksQuery } from "../hooks/useTasks";
import { NavBar } from "../components/NavBar";

const NewTask = () => {
  const router = useRouter();
  const { roomId } = useIdParams();
  const { nextId } = useTasksQuery();
  const pageOrigin = useOriginParam();

  if (!router.isReady) {
    return <LoadingPage />;
  }

  if (roomId === undefined) {
    return <ErrorPage message="roomId missing in URL" />;
  }

  return (
    <>
      <NavBar backUrl={pageOrigin} title="New Task" />
      <EditTaskForm
        initialTask={new Task({ roomId, id: nextId })}
        pageOrigin={pageOrigin}
      />
    </>
  );
};
export default NewTask;
