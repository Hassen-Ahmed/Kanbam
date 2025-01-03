import { createContext, useRef } from "react";
import { ICard, IComment } from "../types/kanbam";

interface IItem {
  id?: string;
  listId?: string;
  boardId?: string;
  indexNumber: number;
  title: string;
  description?: string;
  priority?: string;
  comments?: IComment[];
  isDragging?: boolean;
  cards?: ICard[];
  opacity: string;
}

export interface IItemDragging {
  item: IItem;
  identity: string;
}

export interface IkanbamContext {
  itemDragging: React.MutableRefObject<IItemDragging | null>;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const itemDragging = useRef<IItemDragging | null>(null);

  return (
    <KanbamContext.Provider
      value={{
        itemDragging,
      }}
    >
      {children}
    </KanbamContext.Provider>
  );
};

export default KanbamContextProvider;
