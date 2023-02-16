import { Task } from "../types";
import { LoadingPage } from "../components/LoadingPage";
import { useIdParams } from "../hooks/useIdParams";
import EditTaskForm from "../components/EditTaskForm";
import { useRouter } from "next/router";
import { ErrorPage } from "../components/ErrorPage";
import { useTasksQuery } from "../queries/useTasks";
import { NavBar } from "../components/NavBar";
import { useOriginParam } from "../hooks/useOriginParam";
import { TASKS_ROUTE } from "../constants";

const NewTask = () => {
  const router = useRouter();
  const { roomId } = useIdParams();
  const { nextId, isFetched } = useTasksQuery();
  const pageOrigin = useOriginParam();
  const backUrl =
    pageOrigin === "home" ? "/" : `${TASKS_ROUTE}?roomId=${roomId}`;

  if (!router.isReady || !isFetched) {
    return <LoadingPage />;
  }

  if (roomId === undefined) {
    return <ErrorPage message="roomId missing in URL" />;
  }

  return (
    <>
      <NavBar backUrl={backUrl} title="New Task" />
      <EditTaskForm initialTask={new Task({ roomId, id: nextId })} />
    </>
  );
};
export default NewTask;
