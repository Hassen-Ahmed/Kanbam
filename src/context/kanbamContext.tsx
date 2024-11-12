import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { ICard, IUserResponseDetail } from "../types/kanbam";

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
  paramsWorkspace: IParamsWorkspace;
  paramsBoard: IParamsBoard;
  handleSetParamsWorkspace: (paramValues: IParamsWorkspace) => void;
  handleSetParamsBoard: (paramValues: IParamsBoard) => void;
  userDetail: IUserResponseDetail | null;
  setUserDetail: React.Dispatch<
    React.SetStateAction<IUserResponseDetail | null>
  >;
}

export interface IParamsWorkspace {
  w_id: string;
  w_name: string;
}
export interface IParamsBoard {
  b_id: string;
  b_name: string;
}

export const KanbamContext = createContext<IkanbamContext | null>(null);

const KanbamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme2] = useState<Theme>("dark");
  const itemDragging = useRef<IItemDragging | null>(null);
  const [userDetail, setUserDetail] = useState<IUserResponseDetail | null>(
    null
  );

  const [paramsWorkspace, setParamsWorkspace] = useState<IParamsWorkspace>({
    w_id: "",
    w_name: "",
  });

  const [paramsBoard, setParamsBoard] = useState<IParamsBoard>({
    b_id: "",
    b_name: "",
  });

  const handleSetParamsWorkspace = useCallback(
    (paramValues: IParamsWorkspace) => {
      setParamsWorkspace(paramValues);

      if (paramValues.w_id && paramValues.w_name)
        localStorage.setItem(
          "paramsWorkspaceInfo",
          JSON.stringify(paramValues)
        );
    },
    []
  );

  const handleSetParamsBoard = useCallback((paramValues: IParamsBoard) => {
    setParamsBoard(paramValues);

    if (paramValues.b_id && paramValues.b_name)
      localStorage.setItem("paramsBoardInfo", JSON.stringify(paramValues));
  }, []);

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
        paramsWorkspace,
        paramsBoard,
        handleSetParamsWorkspace,
        handleSetParamsBoard,
        userDetail,
        setUserDetail,
      }}
    >
      {children}
    </KanbamContext.Provider>
  );
};

export default KanbamContextProvider;
