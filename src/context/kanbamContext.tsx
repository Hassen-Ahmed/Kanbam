import { createContext, useEffect, useRef, useState } from "react";
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

type Theme = "light" | "dark";

export interface IkanbamContext {
  themeSetter: (themeValue: Theme) => void;
  itemDragging: React.MutableRefObject<IItemDragging | null>;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const itemDragging = useRef<IItemDragging | null>(null);

  useEffect(() => {
    if (theme) {
      handleAssignTheme(theme);
      localStorage.setItem("theme", theme);
    } else {
      const responseTheme = localStorage.getItem("theme") as Theme;
      handleAssignTheme(responseTheme);
    }
  }, [theme]);

  const handleAssignTheme = (themValue: Theme) => {
    const themeObj = { light: "theme-dark", dark: "theme-light" };
    document.body.classList["add"](`theme-${themValue}`);
    document.body.classList["remove"](themeObj[themValue]);
  };

  const themeSetter = (themeValue: Theme) => {
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
