import { createContext, useEffect, useRef, useState } from "react";
import { Cards } from "../types/board.type";

type Theme = "light" | "dark";

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
  theme2: Theme;
  themeSetter: (themeValue: Theme) => void;
  itemDragging: React.MutableRefObject<IItemDragging | null>;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [theme2, setTheme2] = useState<Theme>("dark");
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

  useEffect(() => {
    const responseTheme = localStorage.getItem("theme") as Theme;
    setTheme2(responseTheme);
  }, []);

  const handleAssignTheme = (themValue: Theme) => {
    const themeObj = { light: "theme-dark", dark: "theme-light" };
    document.body.classList["add"](`theme-${themValue}`);
    document.body.classList["remove"](themeObj[themValue]);
  };

  const themeSetter = (themeValue: Theme) => {
    setTheme(themeValue);
    setTheme2(themeValue);
  };

  return (
    <KanbamContext.Provider
      value={{
        theme2,
        themeSetter,
        itemDragging,
      }}
    >
      {children}
    </KanbamContext.Provider>
  );
};

export default KanbamContextProvider;
