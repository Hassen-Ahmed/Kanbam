import { createContext, useRef, useState } from "react";
import { ICard, IComment, IUserResponseDetail } from "../types/kanbam";

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
  userDetail: IUserResponseDetail | null;
  setUserDetail: React.Dispatch<
    React.SetStateAction<IUserResponseDetail | null>
  >;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const itemDragging = useRef<IItemDragging | null>(null);
  const [userDetail, setUserDetail] = useState<IUserResponseDetail | null>(
    null
  );

  return (
    <KanbamContext.Provider
      value={{
        itemDragging,
        userDetail,
        setUserDetail,
      }}
    >
      {children}
    </KanbamContext.Provider>
  );
};

export default KanbamContextProvider;
