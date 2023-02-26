import { useListsQuery } from "../queries/useListsQuery";
import { LoadingPage } from "../components/LoadingPage";
import { TaskList } from "../components/TaskList";

const Home = () => {
  const { data: allLists, isLoading } = useListsQuery();

  // TODO determine default list to display
  const list = allLists?.[0];

  if (isLoading) {
    return <LoadingPage />;
  }

  return list ? <TaskList list={list} /> : <div>No lists found</div>;
};

export default Home;
