import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../components/nav/NavBar";
import SideBarLeft from "../../components/sidebar/SideBarLeft";
import { ListsContext } from "../../context/ListsContext";
import { useContext } from "react";
import { handleAppOnDrop } from "../../utils/handleAppOnDrop";
import styled from "styled-components";
import { INewTheme } from "../../types/styledComp";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { themes } from "../../utils/constantDatas/themes";
import { IListsContext } from "../../types/kanbam";
import "./Kanbam.scss";
import useUpdates from "../../utils/api/useUpdates";

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
  const { updateList, updateCard } = useUpdates();
  const { lists } = useContext(ListsContext) as IListsContext;
  const { theme } = useContext(KanbamContext) as IkanbamContext;
  const location = useLocation();

  const onDropHandler = () => handleAppOnDrop(lists, updateList, updateCard);

  return (
    <GlobalStyle $newtheme={theme} className="kanbam" onDrop={onDropHandler}>
      <NavBar />
      <div className="kanbam__sub">
        {!location.pathname.includes("kanbam/w") && <SideBarLeft />}

        <div className="kanbam__outlet">
          <Outlet />
        </div>
      </div>
    </GlobalStyle>
  );
}
