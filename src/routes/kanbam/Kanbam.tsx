import { Outlet } from "react-router-dom";
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

export const GlobalStyle = styled.div<INewTheme>`
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["scroll_01"]};
  }

  background-image: linear-gradient(
      180deg,
      ${({ $newtheme }) => themes[$newtheme].bg["scroll_01"]},
      ${({ $newtheme }) => themes[$newtheme].bg["scroll_01"]}
    ),
    url("/images/trello-bg-03.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: soft-light;
`;

export default function Kanbam() {
  const { lists } = useContext(ListsContext) as IListsContext;
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  return (
    <GlobalStyle
      $newtheme={theme}
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
