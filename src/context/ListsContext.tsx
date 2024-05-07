import { createContext, useReducer, useState } from "react";
import { BoardType } from "../types/board.type";
import { boardReducer } from "../reducers/boardReducer";
import { IActionBoard } from "../types/actions.type";

export interface IListsContext {
  lists: BoardType | null;
  dispatch: React.Dispatch<IActionBoard>;
  searchText: string;
  handleSearchTextUpdate: (text: string) => void;
}

export const ListsContext = createContext<IListsContext | null>(null);

const ListsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, dispatch] = useReducer(boardReducer, null);
  const [searchText, setSearchText] = useState("");

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
