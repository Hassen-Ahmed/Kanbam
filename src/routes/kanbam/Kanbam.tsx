import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../components/nav/NavBar";
import SideBarLeft from "../../components/sidebar/SideBarLeft";
import { ListsContext } from "../../context/ListsContext";
import { useContext } from "react";
import { handleAppOnDrop } from "../../utils/handleAppOnDrop";
import "./Kanbam.scss";
import { IListsContext } from "../../types/board.type";
import styled from "styled-components";
import { INewTheme } from "../../types/styledComp";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { themes } from "../../utils/constantDatas/themes";

interface INewTheme2 extends INewTheme {
  $url: string;
}

export const GlobalStyle = styled.div<INewTheme2>`
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["scroll_01"]};
  }

  background-color: ${({ $newtheme, $url }) =>
    $url.includes("board") ? "none" : themes[$newtheme].bg["card_modal"]};
`;

export default function Kanbam() {
  const { lists } = useContext(ListsContext) as IListsContext;
  const { theme } = useContext(KanbamContext) as IkanbamContext;
  const location = useLocation();

  return (
    <GlobalStyle
      $newtheme={theme}
      $url={location.pathname}
      className="kanbam"
      onDrop={() => handleAppOnDrop(lists)}
    >
      <NavBar />
      <div className="kanbam__sub">
        <SideBarLeft />
        <div className="kanbam__outlet">
          <Outlet />
        </div>
      </div>
    </GlobalStyle>
  );
}
