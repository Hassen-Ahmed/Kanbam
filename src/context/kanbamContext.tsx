import { createContext, useEffect, useState } from "react";

export interface IkanbamContext {
  theme?: string;
  themeSetter: (themeValue: string) => void;
  idOfModalCard: string;
  handleModalCardId: (value: string) => void;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("");
  const [idOfModalCard, setIdOfModalCard] = useState("");

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

  const handleModalCardId = (value: string) => {
    setIdOfModalCard(value);
  };

  return (
    <KanbamContext.Provider
      value={{ themeSetter, idOfModalCard, handleModalCardId }}
    >
      {children}
    </KanbamContext.Provider>
  );
};

export default KanbamContextProvider;
