import { useContext } from "react";
import { IListsContext, ListsContext } from "./context/ListsContext";
import Home from "./pages/home/Home";
import UseFetchAllLists from "./customHooks/UseFetchAllLists";
import { handleAppOnDrop } from "./utils/handleAppOnDrop";

const App = () => {
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;
  UseFetchAllLists({ dispatch });

  return (
    <div className="app" onDrop={() => handleAppOnDrop(lists)}>
      <Home />
    </div>
  );
};

export default App;
