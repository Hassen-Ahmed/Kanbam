import { createContext, useEffect, useRef, useState } from "react";
import { ListType } from "../types/board.type";

interface IItem {
  id?: string;
  listId?: string;
  indexNumber: number;
  title: string;
  isDragging?: boolean;
  list?: ListType;
  opacity: string;
}

export interface IItemDragging {
  item: IItem;
  identity: string;
}

export interface IkanbamContext {
  theme?: string;
  themeSetter: (themeValue: string) => void;
  itemDragging: React.MutableRefObject<IItemDragging | null>;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("");
  const itemDragging = useRef<IItemDragging | null>(null);

  useEffect(() => {
    const responseTheme = localStorage.getItem("theme");
    if (responseTheme?.length) {
      setTheme(responseTheme);
      const themeAdd = responseTheme == "light" ? "theme-light" : "theme-dark";
      const themeRemove =
        responseTheme == "light" ? "theme-dark" : "theme-light";
      document.body.classList.add(themeAdd);
      document.body.classList.remove(themeRemove);
    }
  }, []);

  useEffect(() => {
    if (theme.length) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const themeSetter = (themeValue: string) => {
    setTheme(themeValue);
  };

  return (
    <KanbamContext.Provider
      value={{
        themeSetter,
        itemDragging,
      }}
    >
      {children}
    </KanbamContext.Provider>
  );
};

export default KanbamContextProvider;
