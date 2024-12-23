import { createContext, useEffect, useRef, useState } from "react";
import { ICard, IComment, IUserResponseDetail } from "../types/kanbam";
import { themes } from "../utils/constantDatas/themes";
import { Theme } from "../types/theme.type";

export type ThemeName = "light" | "dark" | "aiTheme";

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
  theme: ThemeName;
  themeList: {
    light: Theme;
    dark: Theme;
    aiTheme: Theme;
  };
  themeSetter: (themeValue: ThemeName) => void;
  setRandomNum: React.Dispatch<React.SetStateAction<number>>;
  itemDragging: React.MutableRefObject<IItemDragging | null>;
  userDetail: IUserResponseDetail | null;
  setUserDetail: React.Dispatch<
    React.SetStateAction<IUserResponseDetail | null>
  >;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme2] = useState<ThemeName>("light");
  const [randomNum, setRandomNum] = useState(0);
  const [themeList, setThemeList] = useState(themes);
  const itemDragging = useRef<IItemDragging | null>(null);
  const [userDetail, setUserDetail] = useState<IUserResponseDetail | null>(
    null
  );

  useEffect(() => {
    const storedThemesString = localStorage.getItem("aiTheme");

    if (storedThemesString) {
      const parsedTheme = JSON.parse(storedThemesString);

      setThemeList((prevThemes) => {
        return { ...prevThemes, aiTheme: parsedTheme };
      });
    }
  }, [randomNum]);

  useEffect(() => {
    const responseTheme = localStorage.getItem("theme") as ThemeName;

    if (!responseTheme) {
      localStorage.setItem("theme", "light");
    } else {
      setTheme2(responseTheme);
    }
  }, []);

  const themeSetter = (themeValue: ThemeName) => {
    localStorage.setItem("theme", themeValue);
    setTheme2(themeValue);
  };

  return (
    <KanbamContext.Provider
      value={{
        theme,
        themeList,
        themeSetter,
        setRandomNum,
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
