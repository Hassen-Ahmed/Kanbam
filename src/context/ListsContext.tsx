import { createContext, useReducer, useState } from "react";
import { boardReducer } from "../reducers/boardReducer";
import { IListsContext } from "../types/kanbam";
import PageReloader from "../hooks/PageReloader";

export const ListsContext = createContext<IListsContext | null>(null);

const ListsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, dispatch] = useReducer(boardReducer, null);
  const [searchText, setSearchText] = useState("");

  PageReloader();

  const handleSearchTextUpdate = (text: string) => {
    setSearchText(text.toLocaleLowerCase());
  };

  return (
    <ListsContext.Provider
      value={{ lists, dispatch, searchText, handleSearchTextUpdate }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export default ListsContextProvider;
