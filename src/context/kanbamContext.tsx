import { createContext, useEffect, useRef, useState } from "react";
import { ICard, IUserResponseDetail } from "../types/kanbam";

type Theme = "light" | "dark";

interface IItem {
  id?: string;
  listId?: string;
  boardId?: string;
  indexNumber: number;
  title: string;
  description?: string;
  priority?: string;
  comments?: string[];
  isDragging?: boolean;
  cards?: ICard[];
  opacity: string;
}

export interface IItemDragging {
  item: IItem;
  identity: string;
}

export interface IkanbamContext {
  theme: Theme;
  themeSetter: (themeValue: Theme) => void;
  itemDragging: React.MutableRefObject<IItemDragging | null>;
  userDetail: IUserResponseDetail | null;
  setUserDetail: React.Dispatch<
    React.SetStateAction<IUserResponseDetail | null>
  >;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme2] = useState<Theme>("dark");
  const itemDragging = useRef<IItemDragging | null>(null);
  const [userDetail, setUserDetail] = useState<IUserResponseDetail | null>(
    null
  );

  useEffect(() => {
    const responseTheme = localStorage.getItem("theme") as Theme;

    if (!responseTheme) {
      localStorage.setItem("theme", "dark");
    } else {
      setTheme2(responseTheme);
    }
  }, []);

  const themeSetter = (themeValue: Theme) => {
    localStorage.setItem("theme", themeValue);
    setTheme2(themeValue);
  };

  return (
    <KanbamContext.Provider
      value={{
        theme,
        themeSetter,
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
