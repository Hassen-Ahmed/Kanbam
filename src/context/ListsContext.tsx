import { createContext, useReducer } from "react";
import { BoardType } from "../types/board.type";
import { boardReducer } from "../reducers/boardReducer";
import { IActionBoard } from "../types/actions.type";

export interface IListsContext {
  lists: BoardType | null;
  dispatch: React.Dispatch<IActionBoard>;
}

export const ListsContext = createContext<IListsContext | null>(null);

const ListsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, dispatch] = useReducer(boardReducer, null);

  return (
    <ListsContext.Provider value={{ lists, dispatch }}>
      {children}
    </ListsContext.Provider>
  );
};

export default ListsContextProvider;
