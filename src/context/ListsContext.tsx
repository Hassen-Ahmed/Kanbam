import { createContext, useReducer } from "react";
import { boardReducer } from "../reducers/boardReducer";
import { IListsContext } from "../types/kanbam";
import PageReloader from "../hooks/PageReloader";

export const ListsContext = createContext<IListsContext | null>(null);

const ListsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, dispatch] = useReducer(boardReducer, null);

  PageReloader();

  return (
    <ListsContext.Provider value={{ lists, dispatch }}>
      {children}
    </ListsContext.Provider>
  );
};

export default ListsContextProvider;
