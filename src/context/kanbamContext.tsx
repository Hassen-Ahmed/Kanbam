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
  theme: Theme;
  themeSetter: (themeValue: Theme) => void;
  itemDragging: React.MutableRefObject<IItemDragging | null>;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme2] = useState<Theme>("light");
  const itemDragging = useRef<IItemDragging | null>(null);

  useEffect(() => {
    const responseTheme = localStorage.getItem("theme") as Theme;

    if (!responseTheme) {
      localStorage.setItem("theme", "light");
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
      }}
    >
      {children}
    </KanbamContext.Provider>
  );
};

export default KanbamContextProvider;
