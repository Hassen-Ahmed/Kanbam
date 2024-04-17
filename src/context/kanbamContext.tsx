import { createContext, useEffect, useReducer, useState } from "react";
import { BoardType } from "../types/board.type";
import { boardReducer } from "../reducers/boardReducer";
import { IActionBoard } from "../types/actions.type";

export interface IkanbamContext {
  theme?: string;
  themeSetter: (themeValue: string) => void;
  lists: BoardType | null;
  dispatch: React.Dispatch<IActionBoard>;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("");
  const [lists, dispatch] = useReducer(boardReducer, []);

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
    <KanbamContext.Provider value={{ themeSetter, lists, dispatch }}>
      {children}
    </KanbamContext.Provider>
  );
};

export default KanbamContextProvider;
