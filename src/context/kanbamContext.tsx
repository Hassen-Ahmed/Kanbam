import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { Cards } from "../types/board.type";

interface IItem {
  id?: string;
  listId?: string;
  indexNumber: number;
  title: string;
  description?: string;
  priority?: string;
  comments?: string[];
  isDragging?: boolean;
  cards?: Cards;
  opacity: string;
}

export interface IItemDragging {
  item: IItem;
  identity: string;
}

export interface IkanbamContext {
  themeSetter: (themeValue: string) => void;
  itemDragging: React.MutableRefObject<IItemDragging | null>;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("");
  const itemDragging = useRef<IItemDragging | null>(null);

  const handleAssignTheme = (themValue: string) => {
    if (themValue == "theme-light") {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
    } else if (themValue == "theme-dark") {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
    }
  };

  useEffect(() => {
    if (theme.length) {
      handleAssignTheme(theme);
      localStorage.setItem("theme", theme);
    } else {
      const responseTheme = localStorage.getItem("theme") as string;
      handleAssignTheme(responseTheme);
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
