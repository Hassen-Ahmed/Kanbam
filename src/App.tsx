import { useContext, useEffect } from "react";
import { IkanbamContext, KanbamContext } from "./context/kanbamContext";
import Home from "./pages/home/Home";
import { getAllLists } from "./utils/api/gets";
import CardModal from "./components/card/modal/CardModal";
import { IListsContext, ListsContext } from "./context/ListsContext";

const App = () => {
  const { idOfModalCard, handleModalCardId } = useContext(
    KanbamContext
  ) as IkanbamContext;
  const { dispatch } = useContext(ListsContext) as IListsContext;

  const fetchAllLists = async () => {
    try {
      const res = await getAllLists();
      console.log(res);
      dispatch({ type: "GET_ALL_LISTS", payload: res });
    } catch (err) {
      console.log(`Error message: ${err}`);
    } finally {
      console.log("Alreay sent the request.");
    }
  };

  useEffect(() => {
    fetchAllLists();
  }, []);

  return (
    <div className="app">
      {idOfModalCard.length ? (
        <CardModal handleModalCardId={handleModalCardId} id={idOfModalCard} />
      ) : null}
      <Home />
    </div>
  );
};

export default App;
