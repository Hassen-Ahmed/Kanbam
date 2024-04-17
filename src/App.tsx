import { useContext, useEffect } from "react";
import { IkanbamContext, KanbamContext } from "./context/kanbamContext";
import Home from "./pages/home/Home";
import { getAllLists } from "./utils/api/gets";

const App = () => {
  const { dispatch } = useContext(KanbamContext) as IkanbamContext;

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
      <Home />
    </div>
  );
};

export default App;
